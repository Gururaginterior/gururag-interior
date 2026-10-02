import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import {
  X,
  LogIn,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  CalendarDays,
  MessageSquare,
  Megaphone,
  CheckCircle2,
} from "lucide-react";

const OWNER_UID = "9892c036-24d9-4888-8754-a64f61ff1394";
const SERVICE_BUCKET = "service-images";
const PROJECT_BUCKET = "project-images";
const POPUP_BUCKET = "popup-images";

const emptyService = { title: "", description: "", image_url: "", sort_order: 0 };
const emptyProject = { title: "", category: "", description: "", image_url: "", sort_order: 0 };
const emptyPromotion = {
  type: "normal",
  name: "GURURAG INTERIOR",
  title: "Ready to transform your space?",
  description: "Talk to Gururag Interior about your home, office or renovation project.",
  offer_text: "15% OFF",
  button_text: "Book Now",
  image_url: "",
  start_date: "",
  end_date: "",
  enabled: true,
  sort_order: 0,
};

export default function OwnerDashboard({ onClose }) {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [promotionForm, setPromotionForm] = useState(emptyPromotion);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingPromotionId, setEditingPromotionId] = useState(null);
  const [serviceFile, setServiceFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [promotionFile, setPromotionFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadSession = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (mounted) setSession(data?.session || null);
      } catch (err) {
        if (mounted) setError(err.message || "Could not check login status.");
      } finally {
        if (mounted) setCheckingSession(false);
      }
    };
    loadSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession || null);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!session) {
      setServices([]); setProjects([]); setPromotions([]); setBookings([]); return;
    }
    if (session.user?.id !== OWNER_UID) {
      setSession(null);
      setError("This account is not authorized for the owner dashboard.");
      supabase.auth.signOut();
      return;
    }
    loadData();
  }, [session]);

  const clearMessages = () => { setMessage(""); setError(""); };

  const loadData = async () => {
    setLoadingData(true); clearMessages();
    try {
      const results = await Promise.all([
        supabase.from("services").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true }),
        supabase.from("projects").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true }),
        supabase.from("promotions").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      ]);
      const [s, p, pr, b] = results;
      if (s.error) throw s.error;
      if (p.error) throw p.error;
      if (pr.error) throw pr.error;
      if (b.error) throw b.error;
      setServices(s.data || []); setProjects(p.data || []); setPromotions(pr.data || []); setBookings(b.data || []);
    } catch (err) {
      setError(err.message || "Could not load dashboard data.");
    } finally { setLoadingData(false); }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); setLoginLoading(true); setLoginError("");
    try {
      const { data, error: loginErrorValue } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (loginErrorValue) throw loginErrorValue;
      if (!data?.user) throw new Error("Login failed.");
      if (data.user.id !== OWNER_UID) {
        await supabase.auth.signOut();
        throw new Error("This account is not authorized for the owner dashboard.");
      }
      setSession(data.session); setPassword("");
    } catch (err) { setLoginError(err.message || "Login failed. Check your email and password."); }
    finally { setLoginLoading(false); }
  };

  const handleLogout = async () => {
    clearMessages();
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) { setError(logoutError.message); return; }
    setSession(null); setEmail(""); setPassword("");
  };

  const uploadImage = async (file, bucket, prefix) => {
    if (!file) return "";
    if (!session?.user?.id || session.user.id !== OWNER_UID) throw new Error("Owner authentication is required.");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 60) || "image";
    const filePath = `${prefix}/${Date.now()}-${safeName}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, { cacheControl: "3600", upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const resetServiceForm = () => { setServiceForm({ ...emptyService }); setEditingServiceId(null); setServiceFile(null); };
  const resetProjectForm = () => { setProjectForm({ ...emptyProject }); setEditingProjectId(null); setProjectFile(null); };
  const resetPromotionForm = () => { setPromotionForm({ ...emptyPromotion }); setEditingPromotionId(null); setPromotionFile(null); };

  const saveService = async (event) => {
    event.preventDefault();
    if (!session?.user?.id || session.user.id !== OWNER_UID) return setError("Owner authentication is required.");
    if (!serviceForm.title.trim()) return setError("Service title is required.");
    setSaving(true); clearMessages();
    try {
      let imageUrl = serviceForm.image_url || "";
      if (serviceFile) imageUrl = await uploadImage(serviceFile, SERVICE_BUCKET, "services");
      const payload = { title: serviceForm.title.trim(), description: serviceForm.description.trim(), image_url: imageUrl, sort_order: Number(serviceForm.sort_order) || 0 };
      const result = editingServiceId
        ? await supabase.from("services").update(payload).eq("id", editingServiceId)
        : await supabase.from("services").insert(payload);
      if (result.error) throw result.error;
      setMessage(editingServiceId ? "Service updated successfully." : "Service added successfully.");
      resetServiceForm(); await loadData();
    } catch (err) { setError(err.message || "Could not save service."); }
    finally { setSaving(false); }
  };

  const editService = (item) => {
    clearMessages(); setActiveTab("services"); setEditingServiceId(item.id);
    setServiceForm({ title: item.title || "", description: item.description || "", image_url: item.image_url || "", sort_order: item.sort_order || 0 }); setServiceFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service permanently?")) return;
    setSaving(true); clearMessages();
    try { const { error: e } = await supabase.from("services").delete().eq("id", id); if (e) throw e; if (editingServiceId === id) resetServiceForm(); setMessage("Service deleted successfully."); await loadData(); }
    catch (err) { setError(err.message || "Could not delete service."); } finally { setSaving(false); }
  };

  const saveProject = async (event) => {
    event.preventDefault();
    if (!session?.user?.id || session.user.id !== OWNER_UID) return setError("Owner authentication is required.");
    if (!projectForm.title.trim()) return setError("Project title is required.");
    setSaving(true); clearMessages();
    try {
      let imageUrl = projectForm.image_url || "";
      if (projectFile) imageUrl = await uploadImage(projectFile, PROJECT_BUCKET, "projects");
      const payload = { title: projectForm.title.trim(), category: projectForm.category.trim(), description: projectForm.description.trim(), image_url: imageUrl, sort_order: Number(projectForm.sort_order) || 0 };
      const result = editingProjectId
        ? await supabase.from("projects").update(payload).eq("id", editingProjectId)
        : await supabase.from("projects").insert(payload);
      if (result.error) throw result.error;
      setMessage(editingProjectId ? "Project updated successfully." : "Project added successfully.");
      resetProjectForm(); await loadData();
    } catch (err) { setError(err.message || "Could not save project."); }
    finally { setSaving(false); }
  };

  const editProject = (item) => {
    clearMessages(); setActiveTab("projects"); setEditingProjectId(item.id);
    setProjectForm({ title: item.title || "", category: item.category || "", description: item.description || "", image_url: item.image_url || "", sort_order: item.sort_order || 0 }); setProjectFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    setSaving(true); clearMessages();
    try { const { error: e } = await supabase.from("projects").delete().eq("id", id); if (e) throw e; if (editingProjectId === id) resetProjectForm(); setMessage("Project deleted successfully."); await loadData(); }
    catch (err) { setError(err.message || "Could not delete project."); } finally { setSaving(false); }
  };

  const savePromotion = async (event) => {
    event.preventDefault();
    if (!session?.user?.id || session.user.id !== OWNER_UID) return setError("Owner authentication is required.");
    if (!promotionForm.title.trim()) return setError("Popup title is required.");
    if (promotionForm.type === "festival" && (!promotionForm.start_date || !promotionForm.end_date)) return setError("Festival start and end dates are required.");
    setSaving(true); clearMessages();
    try {
      let imageUrl = promotionForm.image_url || "";
      if (promotionFile) imageUrl = await uploadImage(promotionFile, POPUP_BUCKET, "promotions");
      const payload = {
        type: promotionForm.type,
        name: promotionForm.name.trim(),
        title: promotionForm.title.trim(),
        description: promotionForm.description.trim(),
        offer_text: promotionForm.offer_text.trim(),
        button_text: promotionForm.button_text.trim() || "Book Now",
        image_url: imageUrl,
        start_date: promotionForm.type === "festival" ? promotionForm.start_date : null,
        end_date: promotionForm.type === "festival" ? promotionForm.end_date : null,
        enabled: !!promotionForm.enabled,
        sort_order: Number(promotionForm.sort_order) || 0,
      };
      if (promotionForm.type === "normal") {
        const duplicateNormal = promotions.find((item) => item.type === "normal" && item.id !== editingPromotionId);
        if (duplicateNormal) throw new Error("Only one normal popup is allowed. Edit the existing normal popup instead.");
      }
      const result = editingPromotionId
        ? await supabase.from("promotions").update(payload).eq("id", editingPromotionId)
        : await supabase.from("promotions").insert(payload);
      if (result.error) throw result.error;
      setMessage(editingPromotionId ? "Popup updated successfully." : "Popup added successfully.");
      resetPromotionForm(); await loadData();
    } catch (err) { setError(err.message || "Could not save popup."); }
    finally { setSaving(false); }
  };

  const editPromotion = (item) => {
    clearMessages(); setActiveTab("promotions"); setEditingPromotionId(item.id);
    setPromotionForm({
      type: item.type || "normal", name: item.name || "", title: item.title || "", description: item.description || "",
      offer_text: item.offer_text || "", button_text: item.button_text || "Book Now", image_url: item.image_url || "",
      start_date: item.start_date || "", end_date: item.end_date || "", enabled: item.enabled !== false, sort_order: item.sort_order || 0,
    });
    setPromotionFile(null); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deletePromotion = async (id) => {
    if (!window.confirm("Delete this popup permanently?")) return;
    setSaving(true); clearMessages();
    try { const { error: e } = await supabase.from("promotions").delete().eq("id", id); if (e) throw e; if (editingPromotionId === id) resetPromotionForm(); setMessage("Popup deleted successfully."); await loadData(); }
    catch (err) { setError(err.message || "Could not delete popup."); } finally { setSaving(false); }
  };

  const togglePromotion = async (item) => {
    setSaving(true); clearMessages();
    try { const { error: e } = await supabase.from("promotions").update({ enabled: !item.enabled }).eq("id", item.id); if (e) throw e; setMessage(item.enabled ? "Popup disabled." : "Popup enabled."); await loadData(); }
    catch (err) { setError(err.message || "Could not change popup status."); } finally { setSaving(false); }
  };

  const updateBookingStatus = async (id, status) => {
    setSaving(true); clearMessages();
    try { const { error: e } = await supabase.from("bookings").update({ status }).eq("id", id); if (e) throw e; setMessage("Booking status updated."); await loadData(); }
    catch (err) { setError(err.message || "Could not update booking."); } finally { setSaving(false); }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;
    setSaving(true); clearMessages();
    try { const { error: e } = await supabase.from("bookings").delete().eq("id", id); if (e) throw e; setMessage("Booking deleted."); await loadData(); }
    catch (err) { setError(err.message || "Could not delete booking."); } finally { setSaving(false); }
  };

  if (checkingSession) return <div className="owner-dashboard-backdrop"><div className="owner-loading-card"><RefreshCw className="owner-spin" /><p>Checking owner access...</p></div><style>{OWNER_STYLES}</style></div>;

  if (!session) return (
    <div className="owner-dashboard-backdrop">
      <div className="owner-login-card">
        <button className="owner-close" onClick={onClose} aria-label="Close"><X /></button>
        <div className="owner-login-mark">G</div>
        <span className="owner-eyebrow">PRIVATE ACCESS</span>
        <h2>Owner Sign In</h2>
        <p>Sign in to manage Gururag Interior services, projects, popups and bookings.</p>
        {loginError && <div className="owner-error">{loginError}</div>}
        <form onSubmit={handleLogin}>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Owner email" autoComplete="email" required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" required /></label>
          <button className="owner-primary-button" type="submit" disabled={loginLoading}><LogIn />{loginLoading ? "Signing in..." : "Sign In"}</button>
        </form>
        <div className="owner-login-note">Owner access only.</div>
      </div>
      <style>{OWNER_STYLES}</style>
    </div>
  );

  const tab = (key, label, icon, count) => (
    <button className={activeTab === key ? "owner-tab active" : "owner-tab"} onClick={() => { clearMessages(); setActiveTab(key); }}>
      {icon}{label}{count !== undefined && <span>{count}</span>}
    </button>
  );

  return (
    <div className="owner-dashboard-backdrop owner-dashboard-scroll">
      <div className="owner-dashboard">
        <header className="owner-dashboard-header">
          <div><span className="owner-eyebrow">GURURAG INTERIOR</span><h1>Owner Dashboard</h1><p>Manage services, projects, popup campaigns and incoming bookings.</p></div>
          <div className="owner-header-actions">
            <button className="owner-icon-button" onClick={loadData} disabled={loadingData} aria-label="Refresh"><RefreshCw className={loadingData ? "owner-spin" : ""} /></button>
            <button className="owner-signout" onClick={handleLogout}><LogOut />Sign Out</button>
            <button className="owner-icon-button" onClick={onClose} aria-label="Close dashboard"><X /></button>
          </div>
        </header>

        {message && <div className="owner-success">{message}</div>}
        {error && <div className="owner-error">{error}</div>}

        <div className="owner-tabs">
          {tab("services", "Services", <ImageIcon />, services.length)}
          {tab("projects", "Projects", <ImageIcon />, projects.length)}
          {tab("promotions", "Popup / Offers", <Megaphone />, promotions.length)}
          {tab("bookings", "Bookings", <CalendarDays />, bookings.filter((b) => b.status !== "completed").length)}
        </div>

        {activeTab === "services" && <ContentSection title={editingServiceId ? "Edit Service" : "Add Service"} eyebrow="CONTENT MANAGEMENT" onCancel={editingServiceId ? resetServiceForm : null}>
          <form className="owner-form-card" onSubmit={saveService}>
            <Field label="Service title"><input value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="Modular Kitchens" required /></Field>
            <Field label="Description"><textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Describe this service..." rows={5} /></Field>
            <Field label="Display order"><input type="number" value={serviceForm.sort_order} onChange={(e) => setServiceForm({ ...serviceForm, sort_order: e.target.value })} /></Field>
            <UploadField label="Service image" file={serviceFile} current={serviceForm.image_url} onChange={setServiceFile} />
            <SaveButton saving={saving} editing={!!editingServiceId} label="Service" />
          </form>
          <ListHeading title="Current Services" count={services.length} />
          {services.map((item) => <ContentCard key={item.id} image={item.image_url} eyebrow={`Service ${Number(item.sort_order) + 1}`} title={item.title} description={item.description} onEdit={() => editService(item)} onDelete={() => deleteService(item.id)} />)}
          {!services.length && <Empty text="No services added yet." />}
        </ContentSection>}

        {activeTab === "projects" && <ContentSection title={editingProjectId ? "Edit Project" : "Add Project"} eyebrow="CONTENT MANAGEMENT" onCancel={editingProjectId ? resetProjectForm : null}>
          <form className="owner-form-card" onSubmit={saveProject}>
            <Field label="Project title"><input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Modern Chennai Residence" required /></Field>
            <Field label="Category"><input value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} placeholder="Residential" /></Field>
            <Field label="Description"><textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Describe this project..." rows={5} /></Field>
            <Field label="Display order"><input type="number" value={projectForm.sort_order} onChange={(e) => setProjectForm({ ...projectForm, sort_order: e.target.value })} /></Field>
            <UploadField label="Project image" file={projectFile} current={projectForm.image_url} onChange={setProjectFile} />
            <SaveButton saving={saving} editing={!!editingProjectId} label="Project" />
          </form>
          <ListHeading title="Current Projects" count={projects.length} />
          {projects.map((item) => <ContentCard key={item.id} image={item.image_url} eyebrow={item.category || "Project"} title={item.title} description={item.description} onEdit={() => editProject(item)} onDelete={() => deleteProject(item.id)} />)}
          {!projects.length && <Empty text="No projects added yet." />}
        </ContentSection>}

        {activeTab === "promotions" && <ContentSection title={editingPromotionId ? "Edit Popup" : "Create Popup"} eyebrow="ALWAYS-ON POPUP MANAGER" onCancel={editingPromotionId ? resetPromotionForm : null}>
          <div className="owner-info-card"><Megaphone /><div><strong>Automatic popup behaviour</strong><p>Normal popup is shown outside festival dates. During an enabled festival date range, that festival popup automatically takes over. After the end date, the normal popup returns.</p></div></div>
          <form className="owner-form-card" onSubmit={savePromotion}>
            <Field label="Popup type"><select value={promotionForm.type} onChange={(e) => setPromotionForm({ ...promotionForm, type: e.target.value })}><option value="normal">Normal popup</option><option value="festival">Festival popup</option></select></Field>
            <Field label="Name / festival name"><input value={promotionForm.name} onChange={(e) => setPromotionForm({ ...promotionForm, name: e.target.value })} placeholder="Diwali 2026" /></Field>
            <Field label="Popup heading"><input value={promotionForm.title} onChange={(e) => setPromotionForm({ ...promotionForm, title: e.target.value })} placeholder="Celebrate with a beautiful new interior" required /></Field>
            <Field label="Description"><textarea value={promotionForm.description} onChange={(e) => setPromotionForm({ ...promotionForm, description: e.target.value })} rows={4} placeholder="Popup description..." /></Field>
            <Field label="Offer / Discount text"><input value={promotionForm.offer_text} onChange={(e) => setPromotionForm({ ...promotionForm, offer_text: e.target.value })} placeholder="15% OFF" /><small style={{color:"rgba(244,244,240,.45)",fontSize:"11px"}}>This text appears on the popup offer badge. Example: 15% OFF, 20% OFF, FREE CONSULTATION.</small></Field>
            <Field label="Button text"><input value={promotionForm.button_text} onChange={(e) => setPromotionForm({ ...promotionForm, button_text: e.target.value })} placeholder="Book Now" /></Field>
            {promotionForm.type === "festival" && <div className="owner-two-col"><Field label="Festival start date"><input type="date" value={promotionForm.start_date} onChange={(e) => setPromotionForm({ ...promotionForm, start_date: e.target.value })} required /></Field><Field label="Festival end date"><input type="date" value={promotionForm.end_date} onChange={(e) => setPromotionForm({ ...promotionForm, end_date: e.target.value })} required /></Field></div>}
            <Field label="Display order"><input type="number" value={promotionForm.sort_order} onChange={(e) => setPromotionForm({ ...promotionForm, sort_order: e.target.value })} /></Field>
            <UploadField label="Popup / festival image" file={promotionFile} current={promotionForm.image_url} onChange={setPromotionFile} />
            <label className="owner-toggle"><input type="checkbox" checked={promotionForm.enabled} onChange={(e) => setPromotionForm({ ...promotionForm, enabled: e.target.checked })} /><span>Popup enabled</span></label>
            <SaveButton saving={saving} editing={!!editingPromotionId} label="Popup" />
          </form>
          <ListHeading title="Popup campaigns" count={promotions.length} />
          {promotions.map((item) => <PromotionCard key={item.id} item={item} onEdit={() => editPromotion(item)} onDelete={() => deletePromotion(item.id)} onToggle={() => togglePromotion(item)} />)}
          {!promotions.length && <Empty text="Create the normal popup first, then add festival campaigns." />}
        </ContentSection>}

        {activeTab === "bookings" && <ContentSection title="Customer Bookings" eyebrow="INCOMING ENQUIRIES">
          <div className="owner-info-card"><MessageSquare /><div><strong>Bookings stay on the website</strong><p>Customers submit the form without opening WhatsApp. The booking is stored here, and the server can notify the owner through WhatsApp.</p></div></div>
          <ListHeading title="Recent bookings" count={bookings.length} />
          {bookings.map((item) => <BookingCard key={item.id} item={item} onStatus={(status) => updateBookingStatus(item.id, status)} onDelete={() => deleteBooking(item.id)} />)}
          {!bookings.length && <Empty text="No bookings received yet." />}
        </ContentSection>}
      </div>
      <style>{OWNER_STYLES}</style>
    </div>
  );
}

function ContentSection({ title, eyebrow, onCancel, children }) {
  return <section className="owner-section"><div className="owner-section-heading"><div><span className="owner-eyebrow">{eyebrow}</span><h2>{title}</h2></div>{onCancel && <button className="owner-secondary-button" onClick={onCancel}>Cancel Edit</button>}</div>{children}</section>;
}
function Field({ label, children }) { return <label className="owner-field">{label}{children}</label>; }
function UploadField({ label, file, current, onChange }) { return <label className="owner-upload-box"><span><Upload />{label}</span><input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0] || null)} />{file && <small>Selected: {file.name}</small>}{!file && current && <img src={current} alt="Current" />}</label>; }
function SaveButton({ saving, editing, label }) { return <button className="owner-primary-button" type="submit" disabled={saving}>{saving ? <><RefreshCw className="owner-spin" />Saving...</> : <>{editing ? <Pencil /> : <Plus />}{editing ? `Update ${label}` : `Add ${label}`}</>}</button>; }
function ListHeading({ title, count }) { return <div className="owner-list-heading"><h2>{title}</h2><span>{count} items</span></div>; }
function ContentCard({ image, eyebrow, title, description, onEdit, onDelete }) { return <article className="owner-content-card"><div className="owner-content-image">{image ? <img src={image} alt={title} /> : <ImageIcon />}</div><div className="owner-content-info"><span>{eyebrow}</span><h3>{title}</h3><p>{description || "No description added."}</p><div className="owner-card-actions"><button onClick={onEdit}><Pencil />Edit</button><button className="danger" onClick={onDelete}><Trash2 />Delete</button></div></div></article>; }
function PromotionCard({ item, onEdit, onDelete, onToggle }) { return <article className="owner-promo-card"><div className="owner-promo-image">{item.image_url ? <img src={item.image_url} alt={item.name} /> : <Megaphone />}</div><div className="owner-promo-info"><div className="owner-promo-top"><span className={item.type === "festival" ? "promo-type festival" : "promo-type"}>{item.type === "festival" ? "FESTIVAL" : "NORMAL"}</span><span className={item.enabled ? "status-on" : "status-off"}>{item.enabled ? "ACTIVE" : "OFF"}</span></div><h3>{item.name || "GURURAG INTERIOR"}</h3><strong>{item.title}</strong>{item.offer_text && <div style={{marginTop:"8px",fontWeight:800,color:"#d8ff45"}}>{item.offer_text}</div>}<p>{item.description || "No description added."}</p>{item.type === "festival" && <small>{item.start_date} 鈫� {item.end_date}</small>}<div className="owner-card-actions"><button onClick={onToggle}>{item.enabled ? "Disable" : "Enable"}</button><button onClick={onEdit}><Pencil />Edit</button><button className="danger" onClick={onDelete}><Trash2 />Delete</button></div></div></article>; }
function BookingCard({ item, onStatus, onDelete }) { return <article className="owner-booking-card"><div className="owner-booking-icon"><CalendarDays /></div><div className="owner-booking-info"><div className="owner-promo-top"><span className="promo-type">BOOKING</span><span className={`booking-status ${item.status || "new"}`}>{(item.status || "new").toUpperCase()}</span></div><h3>{item.name || "Customer"}</h3><p><strong>Phone:</strong> {item.phone || "-"}</p><p><strong>Service:</strong> {item.service || "-"}</p><p><strong>Preferred date:</strong> {item.preferred_date || "Not specified"}</p>{item.message && <p><strong>Requirement:</strong> {item.message}</p>}<small>{item.created_at ? new Date(item.created_at).toLocaleString() : ""}</small><div className="owner-card-actions"><button onClick={() => onStatus("contacted")}><CheckCircle2 />Contacted</button><button onClick={() => onStatus("completed")}>Completed</button><button className="danger" onClick={onDelete}><Trash2 />Delete</button></div></div></article>; }
function Empty({ text }) { return <div className="owner-empty"><ImageIcon /><p>{text}</p></div>; }

const OWNER_STYLES = `
.owner-dashboard-backdrop{position:fixed;inset:0;z-index:99999;background:rgba(7,10,14,.96);color:#f4f4f0;font-family:inherit;display:flex;align-items:center;justify-content:center;padding:18px}.owner-dashboard-scroll{overflow-y:auto;align-items:flex-start}.owner-loading-card,.owner-login-card,.owner-dashboard{width:min(100%,1080px)}.owner-loading-card{min-height:180px;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:#11151a;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}.owner-login-card{position:relative;max-width:460px;padding:38px;border-radius:28px;background:#11151a;border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 100px rgba(0,0,0,.45)}.owner-close,.owner-icon-button{border:0;cursor:pointer;color:#f4f4f0;background:rgba(255,255,255,.07)}.owner-close{position:absolute;top:18px;right:18px;width:42px;height:42px;border-radius:50%;display:grid;place-items:center}.owner-close svg,.owner-icon-button svg,.owner-signout svg,.owner-primary-button svg,.owner-secondary-button svg,.owner-card-actions svg,.owner-upload-box svg,.owner-empty svg,.owner-tab svg,.owner-info-card>svg{width:17px;height:17px}.owner-login-mark{width:58px;height:58px;border-radius:18px;background:#d8ff45;color:#08100c;display:grid;place-items:center;font-size:26px;font-weight:800;margin-bottom:22px}.owner-eyebrow{display:block;color:#91e6bd;font-size:11px;letter-spacing:.18em;font-weight:700;margin-bottom:8px}.owner-login-card h2,.owner-dashboard-header h1,.owner-section-heading h2{margin:0;letter-spacing:-.03em}.owner-login-card h2{font-size:34px}.owner-login-card p,.owner-dashboard-header p,.owner-info-card p{color:rgba(244,244,240,.64);line-height:1.6}.owner-login-card form,.owner-form-card{display:grid;gap:16px;margin-top:25px}.owner-field{display:grid;gap:8px;color:rgba(244,244,240,.82);font-size:13px;font-weight:600}.owner-login-card input,.owner-form-card input,.owner-form-card textarea,.owner-form-card select{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);background:#191e24;color:#fff;border-radius:13px;padding:14px 15px;outline:none;font:inherit}.owner-form-card select option{background:#11151a;color:#fff}.owner-login-card input:focus,.owner-form-card input:focus,.owner-form-card textarea:focus,.owner-form-card select:focus{border-color:#91e6bd}.owner-form-card textarea{resize:vertical;min-height:110px}.owner-primary-button,.owner-secondary-button,.owner-signout,.owner-tab,.owner-card-actions button{border:0;cursor:pointer;font:inherit}.owner-primary-button{min-height:48px;padding:0 18px;border-radius:13px;background:#d8ff45;color:#07100b;font-weight:800;display:inline-flex;align-items:center;justify-content:center;gap:9px}.owner-primary-button:disabled{opacity:.55;cursor:wait}.owner-login-note{margin-top:18px;color:rgba(244,244,240,.42);font-size:12px;text-align:center}.owner-error,.owner-success{margin:14px 0;padding:13px 15px;border-radius:12px;font-size:13px;line-height:1.5}.owner-error{background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.24);color:#ffb2b2}.owner-success{background:rgba(145,230,189,.1);border:1px solid rgba(145,230,189,.22);color:#b9f4d4}.owner-dashboard{padding:24px 0 60px}.owner-dashboard-header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding:10px 0 24px}.owner-dashboard-header h1{font-size:clamp(30px,6vw,48px)}.owner-header-actions{display:flex;align-items:center;gap:8px}.owner-icon-button,.owner-signout{min-height:42px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 12px}.owner-signout{color:#f4f4f0;background:rgba(255,255,255,.07)}.owner-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:8px 0 28px}.owner-tab{min-height:52px;border-radius:14px;background:#171c21;color:rgba(244,244,240,.58);font-weight:800;display:flex;align-items:center;justify-content:center;gap:7px}.owner-tab span{opacity:.6}.owner-tab.active{background:#d8ff45;color:#07100b}.owner-section{display:grid;gap:22px}.owner-section-heading,.owner-list-heading,.owner-promo-top{display:flex;justify-content:space-between;align-items:center;gap:15px}.owner-secondary-button{min-height:40px;padding:0 13px;border-radius:11px;background:rgba(255,255,255,.08);color:#fff}.owner-form-card{padding:20px;border-radius:20px;background:#11151a;border:1px solid rgba(255,255,255,.1)}.owner-upload-box{display:grid;gap:8px;border:1px dashed rgba(255,255,255,.2);border-radius:15px;padding:15px;color:rgba(244,244,240,.82);font-size:13px;font-weight:600}.owner-upload-box>span{display:flex;align-items:center;gap:8px}.owner-upload-box input[type=file]{border:0;background:transparent;padding:8px 0}.owner-upload-box img{width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin-top:4px}.owner-list-heading h2{margin:0}.owner-list-heading span{color:rgba(244,244,240,.45);font-size:12px}.owner-content-card,.owner-promo-card,.owner-booking-card{display:grid;grid-template-columns:150px 1fr;gap:18px;padding:14px;border-radius:18px;background:#11151a;border:1px solid rgba(255,255,255,.1)}.owner-content-image,.owner-promo-image{min-height:130px;border-radius:13px;background:#1a2026;overflow:hidden;display:grid;place-items:center;color:rgba(244,244,240,.35)}.owner-content-image img,.owner-promo-image img{width:100%;height:100%;min-height:130px;object-fit:cover}.owner-content-info>span,.promo-type{color:#91e6bd;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.owner-content-info h3,.owner-promo-info h3,.owner-booking-info h3{margin:7px 0;font-size:21px}.owner-content-info p,.owner-promo-info p,.owner-booking-info p{color:rgba(244,244,240,.58);line-height:1.55;margin:0 0 5px}.owner-card-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.owner-card-actions button{display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:0 12px;border-radius:10px;background:rgba(255,255,255,.08);color:#fff}.owner-card-actions button.danger{color:#ffaaaa;background:rgba(255,90,90,.08)}.owner-empty{min-height:180px;border-radius:18px;border:1px dashed rgba(255,255,255,.12);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:rgba(244,244,240,.45)}.owner-empty p{margin:0}.owner-spin{animation:ownerSpin 1s linear infinite}@keyframes ownerSpin{to{transform:rotate(360deg)}}.owner-two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px}.owner-info-card{display:flex;gap:13px;align-items:flex-start;padding:16px;border-radius:16px;background:rgba(145,230,189,.07);border:1px solid rgba(145,230,189,.15)}.owner-info-card strong{display:block;margin-bottom:4px}.owner-info-card p{margin:0;font-size:13px}.owner-toggle{display:flex;align-items:center;gap:10px;color:#fff;font-size:13px}.owner-toggle input{width:18px;height:18px}.owner-promo-card{grid-template-columns:190px 1fr}.owner-promo-image{min-height:180px}.owner-promo-info>strong{display:block;font-size:17px;margin-bottom:7px}.promo-type{padding:5px 8px;border-radius:999px;background:rgba(145,230,189,.08)}.promo-type.festival{color:#d8ff45;background:rgba(216,255,69,.08)}.status-on,.status-off,.booking-status{font-size:10px;font-weight:800;letter-spacing:.1em}.status-on{color:#91e6bd}.status-off{color:#ffaaaa}.booking-status{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.08);color:#fff}.booking-status.completed{color:#91e6bd}.booking-status.contacted{color:#d8ff45}.owner-booking-card{grid-template-columns:56px 1fr}.owner-booking-icon{width:56px;height:56px;border-radius:15px;background:#d8ff45;color:#07100b;display:grid;place-items:center}.owner-booking-info small,.owner-promo-info small{color:rgba(244,244,240,.4);font-size:11px}.owner-booking-info p strong{color:rgba(244,244,240,.85)}
@media(max-width:800px){.owner-tabs{grid-template-columns:1fr 1fr}.owner-dashboard-header{flex-direction:column}.owner-header-actions{width:100%}.owner-header-actions .owner-signout{flex:1}.owner-content-card,.owner-promo-card{grid-template-columns:1fr}.owner-content-image,.owner-promo-image{min-height:190px}.owner-content-image img,.owner-promo-image img{min-height:190px}.owner-section-heading{align-items:flex-start;flex-direction:column}.owner-two-col{grid-template-columns:1fr}}
@media(max-width:520px){.owner-dashboard-backdrop{padding:10px}.owner-dashboard{padding:12px 0 40px}.owner-login-card{padding:28px 20px}.owner-tabs{grid-template-columns:1fr 1fr}.owner-tab{font-size:11px;padding:0 5px}.owner-tab svg{display:none}.owner-booking-card{grid-template-columns:1fr}.owner-booking-icon{width:48px;height:48px}.owner-section-heading h2{font-size:28px}}
`;
