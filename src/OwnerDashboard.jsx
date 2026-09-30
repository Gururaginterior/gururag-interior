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
} from "lucide-react";

const OWNER_UID = "9892c036-24d9-4888-8754-a64f61ff1394";

const SERVICE_BUCKET = "service-images";
const PROJECT_BUCKET = "project-images";

const emptyService = {
  title: "",
  description: "",
  image_url: "",
  sort_order: 0,
};

const emptyProject = {
  title: "",
  category: "",
  description: "",
  image_url: "",
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

  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);

  const [serviceForm, setServiceForm] = useState(emptyService);
  const [projectForm, setProjectForm] = useState(emptyProject);

  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [serviceFile, setServiceFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      try {
        const { data, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (mounted) {
          setSession(data?.session || null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Could not check login status.");
        }
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession || null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setServices([]);
      setProjects([]);
      return;
    }

    if (session.user?.id !== OWNER_UID) {
      setSession(null);
      setError("This account is not authorized for the owner dashboard.");
      supabase.auth.signOut();
      return;
    }

    loadData();
  }, [session]);

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  const loadData = async () => {
    setLoadingData(true);
    clearMessages();

    try {
      const [servicesResult, projectsResult] = await Promise.all([
        supabase
          .from("services")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true }),

        supabase
          .from("projects")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true }),
      ]);

      if (servicesResult.error) {
        throw servicesResult.error;
      }

      if (projectsResult.error) {
        throw projectsResult.error;
      }

      setServices(servicesResult.data || []);
      setProjects(projectsResult.data || []);
    } catch (err) {
      setError(err.message || "Could not load dashboard data.");
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoginLoading(true);
    clearMessages();

    try {
      const { data, error: loginErrorValue } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginErrorValue) {
        throw loginErrorValue;
      }

      if (!data?.user) {
        throw new Error("Login failed.");
      }

      if (data.user.id !== OWNER_UID) {
        await supabase.auth.signOut();
        throw new Error(
          "This account is not authorized for the owner dashboard."
        );
      }

      setSession(data.session);
      setPassword("");
    } catch (err) {
      setLoginError(
        err.message || "Login failed. Check your email and password."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    clearMessages();

    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      return;
    }

    setSession(null);
    setEmail("");
    setPassword("");
  };

  const uploadImage = async (file, bucket, prefix) => {
    if (!file) {
      return "";
    }

    if (!session?.user?.id || session.user.id !== OWNER_UID) {
      throw new Error("Owner authentication is required.");
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const safeName =
      file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .slice(0, 60) || "image";

    const filePath = `${prefix}/${Date.now()}-${safeName}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const resetServiceForm = () => {
    setServiceForm(emptyService);
    setEditingServiceId(null);
    setServiceFile(null);
  };

  const resetProjectForm = () => {
    setProjectForm(emptyProject);
    setEditingProjectId(null);
    setProjectFile(null);
  };

  const saveService = async (event) => {
    event.preventDefault();

    if (!session?.user?.id || session.user.id !== OWNER_UID) {
      setError("Owner authentication is required.");
      return;
    }

    if (!serviceForm.title.trim()) {
      setError("Service title is required.");
      return;
    }

    setSaving(true);
    clearMessages();

    try {
      let imageUrl = serviceForm.image_url || "";

      if (serviceFile) {
        imageUrl = await uploadImage(
          serviceFile,
          SERVICE_BUCKET,
          "services"
        );
      }

      const payload = {
        title: serviceForm.title.trim(),
        description: serviceForm.description.trim(),
        image_url: imageUrl,
        sort_order: Number(serviceForm.sort_order) || 0,
      };

      if (editingServiceId) {
        const { error: updateError } = await supabase
          .from("services")
          .update(payload)
          .eq("id", editingServiceId);

        if (updateError) {
          throw updateError;
        }

        setMessage("Service updated successfully.");
      } else {
        const { error: insertError } = await supabase
          .from("services")
          .insert(payload);

        if (insertError) {
          throw insertError;
        }

        setMessage("Service added successfully.");
      }

      resetServiceForm();
      await loadData();
    } catch (err) {
      setError(err.message || "Could not save service.");
    } finally {
      setSaving(false);
    }
  };

  const editService = (item) => {
    clearMessages();

    setActiveTab("services");

    setEditingServiceId(item.id);

    setServiceForm({
      title: item.title || "",
      description: item.description || "",
      image_url: item.image_url || "",
      sort_order: item.sort_order || 0,
    });

    setServiceFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteService = async (id) => {
    const confirmed = window.confirm(
      "Delete this service permanently?"
    );

    if (!confirmed) {
      return;
    }

    setSaving(true);
    clearMessages();

    try {
      const { error: deleteError } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      if (editingServiceId === id) {
        resetServiceForm();
      }

      setMessage("Service deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message || "Could not delete service.");
    } finally {
      setSaving(false);
    }
  };

  const saveProject = async (event) => {
    event.preventDefault();

    if (!session?.user?.id || session.user.id !== OWNER_UID) {
      setError("Owner authentication is required.");
      return;
    }

    if (!projectForm.title.trim()) {
      setError("Project title is required.");
      return;
    }

    setSaving(true);
    clearMessages();

    try {
      let imageUrl = projectForm.image_url || "";

      if (projectFile) {
        imageUrl = await uploadImage(
          projectFile,
          PROJECT_BUCKET,
          "projects"
        );
      }

      const payload = {
        title: projectForm.title.trim(),
        category: projectForm.category.trim(),
        description: projectForm.description.trim(),
        image_url: imageUrl,
        sort_order: Number(projectForm.sort_order) || 0,
      };

      if (editingProjectId) {
        const { error: updateError } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProjectId);

        if (updateError) {
          throw updateError;
        }

        setMessage("Project updated successfully.");
      } else {
        const { error: insertError } = await supabase
          .from("projects")
          .insert(payload);

        if (insertError) {
          throw insertError;
        }

        setMessage("Project added successfully.");
      }

      resetProjectForm();
      await loadData();
    } catch (err) {
      setError(err.message || "Could not save project.");
    } finally {
      setSaving(false);
    }
  };

  const editProject = (item) => {
    clearMessages();

    setActiveTab("projects");

    setEditingProjectId(item.id);

    setProjectForm({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      image_url: item.image_url || "",
      sort_order: item.sort_order || 0,
    });

    setProjectFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProject = async (id) => {
    const confirmed = window.confirm(
      "Delete this project permanently?"
    );

    if (!confirmed) {
      return;
    }

    setSaving(true);
    clearMessages();

    try {
      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      if (editingProjectId === id) {
        resetProjectForm();
      }

      setMessage("Project deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message || "Could not delete project.");
    } finally {
      setSaving(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="owner-dashboard-backdrop">
        <div className="owner-loading-card">
          <RefreshCw className="owner-spin" />
          <p>Checking owner access...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="owner-dashboard-backdrop">
        <div className="owner-login-card">
          <button
            className="owner-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </button>

          <div className="owner-login-mark">
            G
          </div>

          <span className="owner-eyebrow">
            PRIVATE ACCESS
          </span>

          <h2>Owner Sign In</h2>

          <p>
            Sign in to manage Gururag Interior services and projects.
          </p>

          {loginError && (
            <div className="owner-error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Owner email"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              className="owner-primary-button"
              type="submit"
              disabled={loginLoading}
            >
              <LogIn />
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="owner-login-note">
            Owner access only.
          </div>
        </div>

        <style>{OWNER_STYLES}</style>
      </div>
    );
  }

  return (
    <div className="owner-dashboard-backdrop owner-dashboard-scroll">
      <div className="owner-dashboard">
        <header className="owner-dashboard-header">
          <div>
            <span className="owner-eyebrow">
              GURURAG INTERIOR
            </span>
            <h1>Owner Dashboard</h1>
            <p>
              Manage the content shown inside the menu pages.
            </p>
          </div>

          <div className="owner-header-actions">
            <button
              className="owner-icon-button"
              onClick={loadData}
              disabled={loadingData}
              aria-label="Refresh"
            >
              <RefreshCw
                className={loadingData ? "owner-spin" : ""}
              />
            </button>

            <button
              className="owner-signout"
              onClick={handleLogout}
            >
              <LogOut />
              Sign Out
            </button>

            <button
              className="owner-icon-button"
              onClick={onClose}
              aria-label="Close dashboard"
            >
              <X />
            </button>
          </div>
        </header>

        {message && (
          <div className="owner-success">
            {message}
          </div>
        )}

        {error && (
          <div className="owner-error">
            {error}
          </div>
        )}

        <div className="owner-tabs">
          <button
            className={
              activeTab === "services"
                ? "owner-tab active"
                : "owner-tab"
            }
            onClick={() => {
              clearMessages();
              setActiveTab("services");
            }}
          >
            Services
            <span>{services.length}</span>
          </button>

          <button
            className={
              activeTab === "projects"
                ? "owner-tab active"
                : "owner-tab"
            }
            onClick={() => {
              clearMessages();
              setActiveTab("projects");
            }}
          >
            Projects
            <span>{projects.length}</span>
          </button>
        </div>

        {activeTab === "services" && (
          <section className="owner-section">
            <div className="owner-section-heading">
              <div>
                <span className="owner-eyebrow">
                  CONTENT MANAGEMENT
                </span>
                <h2>
                  {editingServiceId
                    ? "Edit Service"
                    : "Add Service"}
                </h2>
              </div>

              {editingServiceId && (
                <button
                  className="owner-secondary-button"
                  onClick={resetServiceForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form
              className="owner-form-card"
              onSubmit={saveService}
            >
              <label>
                Service title
                <input
                  value={serviceForm.title}
                  onChange={(event) =>
                    setServiceForm({
                      ...serviceForm,
                      title: event.target.value,
                    })
                  }
                  placeholder="Modular Kitchens"
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  value={serviceForm.description}
                  onChange={(event) =>
                    setServiceForm({
                      ...serviceForm,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe this service..."
                  rows={5}
                />
              </label>

              <label>
                Display order
                <input
                  type="number"
                  value={serviceForm.sort_order}
                  onChange={(event) =>
                    setServiceForm({
                      ...serviceForm,
                      sort_order: event.target.value,
                    })
                  }
                />
              </label>

              <label className="owner-upload-box">
                <span>
                  <Upload />
                  Service image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setServiceFile(
                      event.target.files?.[0] || null
                    )
                  }
                />

                {serviceFile && (
                  <small>
                    Selected: {serviceFile.name}
                  </small>
                )}

                {!serviceFile &&
                  serviceForm.image_url && (
                    <img
                      src={serviceForm.image_url}
                      alt="Current service"
                    />
                  )}
              </label>

              <button
                className="owner-primary-button"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="owner-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingServiceId ? (
                      <Pencil />
                    ) : (
                      <Plus />
                    )}
                    {editingServiceId
                      ? "Update Service"
                      : "Add Service"}
                  </>
                )}
              </button>
            </form>

            <div className="owner-list">
              <div className="owner-list-heading">
                <h2>Current Services</h2>
                <span>{services.length} items</span>
              </div>

              {services.length === 0 && (
                <div className="owner-empty">
                  <ImageIcon />
                  <p>No services added yet.</p>
                </div>
              )}

              {services.map((item) => (
                <article
                  className="owner-content-card"
                  key={item.id}
                >
                  <div className="owner-content-image">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                      />
                    ) : (
                      <ImageIcon />
                    )}
                  </div>

                  <div className="owner-content-info">
                    <span>
                      Service {Number(item.sort_order) + 1}
                    </span>

                    <h3>{item.title}</h3>

                    <p>
                      {item.description ||
                        "No description added."}
                    </p>

                    <div className="owner-card-actions">
                      <button
                        onClick={() => editService(item)}
                      >
                        <Pencil />
                        Edit
                      </button>

                      <button
                        className="danger"
                        onClick={() =>
                          deleteService(item.id)
                        }
                      >
                        <Trash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "projects" && (
          <section className="owner-section">
            <div className="owner-section-heading">
              <div>
                <span className="owner-eyebrow">
                  CONTENT MANAGEMENT
                </span>
                <h2>
                  {editingProjectId
                    ? "Edit Project"
                    : "Add Project"}
                </h2>
              </div>

              {editingProjectId && (
                <button
                  className="owner-secondary-button"
                  onClick={resetProjectForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form
              className="owner-form-card"
              onSubmit={saveProject}
            >
              <label>
                Project title
                <input
                  value={projectForm.title}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      title: event.target.value,
                    })
                  }
                  placeholder="Modern Chennai Residence"
                  required
                />
              </label>

              <label>
                Category
                <input
                  value={projectForm.category}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      category: event.target.value,
                    })
                  }
                  placeholder="Residential"
                />
              </label>

              <label>
                Description
                <textarea
                  value={projectForm.description}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe this project..."
                  rows={5}
                />
              </label>

              <label>
                Display order
                <input
                  type="number"
                  value={projectForm.sort_order}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      sort_order: event.target.value,
                    })
                  }
                />
              </label>

              <label className="owner-upload-box">
                <span>
                  <Upload />
                  Project image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setProjectFile(
                      event.target.files?.[0] || null
                    )
                  }
                />

                {projectFile && (
                  <small>
                    Selected: {projectFile.name}
                  </small>
                )}

                {!projectFile &&
                  projectForm.image_url && (
                    <img
                      src={projectForm.image_url}
                      alt="Current project"
                    />
                  )}
              </label>

              <button
                className="owner-primary-button"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="owner-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingProjectId ? (
                      <Pencil />
                    ) : (
                      <Plus />
                    )}
                    {editingProjectId
                      ? "Update Project"
                      : "Add Project"}
                  </>
                )}
              </button>
            </form>

            <div className="owner-list">
              <div className="owner-list-heading">
                <h2>Current Projects</h2>
                <span>{projects.length} items</span>
              </div>

              {projects.length === 0 && (
                <div className="owner-empty">
                  <ImageIcon />
                  <p>No projects added yet.</p>
                </div>
              )}

              {projects.map((item) => (
                <article
                  className="owner-content-card"
                  key={item.id}
                >
                  <div className="owner-content-image">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                      />
                    ) : (
                      <ImageIcon />
                    )}
                  </div>

                  <div className="owner-content-info">
                    <span>
                      {item.category || "Project"}
                    </span>

                    <h3>{item.title}</h3>

                    <p>
                      {item.description ||
                        "No description added."}
                    </p>

                    <div className="owner-card-actions">
                      <button
                        onClick={() => editProject(item)}
                      >
                        <Pencil />
                        Edit
                      </button>

                      <button
                        className="danger"
                        onClick={() =>
                          deleteProject(item.id)
                        }
                      >
                        <Trash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{OWNER_STYLES}</style>
    </div>
  );
}

const OWNER_STYLES = `
.owner-dashboard-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(7, 10, 14, 0.96);
  color: #f4f4f0;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}

.owner-dashboard-scroll {
  overflow-y: auto;
  align-items: flex-start;
}

.owner-loading-card,
.owner-login-card,
.owner-dashboard {
  width: min(100%, 1080px);
}

.owner-loading-card {
  min-height: 180px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 24px;
  background: #11151a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.owner-login-card {
  position: relative;
  max-width: 460px;
  padding: 38px;
  border-radius: 28px;
  background: #11151a;
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 30px 100px rgba(0,0,0,.45);
}

.owner-close,
.owner-icon-button {
  border: 0;
  cursor: pointer;
  color: #f4f4f0;
  background: rgba(255,255,255,.07);
}

.owner-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.owner-close svg,
.owner-icon-button svg,
.owner-signout svg,
.owner-primary-button svg,
.owner-secondary-button svg,
.owner-card-actions svg,
.owner-upload-box svg,
.owner-empty svg {
  width: 18px;
  height: 18px;
}

.owner-login-mark {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: #d8ff45;
  color: #08100c;
  display: grid;
  place-items: center;
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 22px;
}

.owner-eyebrow {
  display: block;
  color: #91e6bd;
  font-size: 11px;
  letter-spacing: .18em;
  font-weight: 700;
  margin-bottom: 8px;
}

.owner-login-card h2,
.owner-dashboard-header h1,
.owner-section-heading h2 {
  margin: 0;
  letter-spacing: -.03em;
}

.owner-login-card h2 {
  font-size: 34px;
}

.owner-login-card p,
.owner-dashboard-header p {
  color: rgba(244,244,240,.64);
  line-height: 1.6;
}

.owner-login-card form,
.owner-form-card {
  display: grid;
  gap: 16px;
  margin-top: 25px;
}

.owner-login-card label,
.owner-form-card label {
  display: grid;
  gap: 8px;
  color: rgba(244,244,240,.82);
  font-size: 13px;
  font-weight: 600;
}

.owner-login-card input,
.owner-form-card input,
.owner-form-card textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(255,255,255,.12);
  background: #191e24;
  color: #fff;
  border-radius: 13px;
  padding: 14px 15px;
  outline: none;
  font: inherit;
}

.owner-login-card input:focus,
.owner-form-card input:focus,
.owner-form-card textarea:focus {
  border-color: #91e6bd;
}

.owner-form-card textarea {
  resize: vertical;
  min-height: 110px;
}

.owner-primary-button,
.owner-secondary-button,
.owner-signout,
.owner-tab,
.owner-card-actions button {
  border: 0;
  cursor: pointer;
  font: inherit;
}

.owner-primary-button {
  min-height: 48px;
  padding: 0 18px;
  border-radius: 13px;
  background: #d8ff45;
  color: #07100b;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.owner-primary-button:disabled {
  opacity: .55;
  cursor: wait;
}

.owner-login-note {
  margin-top: 18px;
  color: rgba(244,244,240,.42);
  font-size: 12px;
  text-align: center;
}

.owner-error,
.owner-success {
  margin: 14px 0;
  padding: 13px 15px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.5;
}

.owner-error {
  background: rgba(255,90,90,.10);
  border: 1px solid rgba(255,90,90,.24);
  color: #ffb2b2;
}

.owner-success {
  background: rgba(145,230,189,.10);
  border: 1px solid rgba(145,230,189,.22);
  color: #b9f4d4;
}

.owner-dashboard {
  padding: 24px 0 60px;
}

.owner-dashboard-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  padding: 10px 0 24px;
}

.owner-dashboard-header h1 {
  font-size: clamp(30px, 6vw, 48px);
}

.owner-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.owner-icon-button,
.owner-signout {
  min-height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
}

.owner-signout {
  color: #f4f4f0;
  background: rgba(255,255,255,.07);
}

.owner-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 8px 0 28px;
}

.owner-tab {
  min-height: 52px;
  border-radius: 14px;
  background: #171c21;
  color: rgba(244,244,240,.58);
  font-weight: 800;
}

.owner-tab span {
  margin-left: 7px;
  opacity: .6;
}

.owner-tab.active {
  background: #d8ff45;
  color: #07100b;
}

.owner-section {
  display: grid;
  gap: 22px;
}

.owner-section-heading,
.owner-list-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.owner-secondary-button {
  min-height: 40px;
  padding: 0 13px;
  border-radius: 11px;
  background: rgba(255,255,255,.08);
  color: #fff;
}

.owner-form-card {
  padding: 20px;
  border-radius: 20px;
  background: #11151a;
  border: 1px solid rgba(255,255,255,.1);
}

.owner-upload-box {
  border: 1px dashed rgba(255,255,255,.2);
  border-radius: 15px;
  padding: 15px;
}

.owner-upload-box > span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.owner-upload-box input[type="file"] {
  border: 0;
  background: transparent;
  padding: 12px 0 0;
}

.owner-upload-box img {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 12px;
}

.owner-list {
  display: grid;
  gap: 14px;
}

.owner-list-heading h2 {
  margin: 0;
}

.owner-list-heading span {
  color: rgba(244,244,240,.45);
  font-size: 12px;
}

.owner-content-card {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 18px;
  padding: 14px;
  border-radius: 18px;
  background: #11151a;
  border: 1px solid rgba(255,255,255,.1);
}

.owner-content-image {
  min-height: 130px;
  border-radius: 13px;
  background: #1a2026;
  overflow: hidden;
  display: grid;
  place-items: center;
  color: rgba(244,244,240,.35);
}

.owner-content-image img {
  width: 100%;
  height: 100%;
  min-height: 130px;
  object-fit: cover;
}

.owner-content-info > span {
  color: #91e6bd;
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.owner-content-info h3 {
  margin: 7px 0;
  font-size: 21px;
}

.owner-content-info p {
  color: rgba(244,244,240,.58);
  line-height: 1.55;
  margin: 0;
}

.owner-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.owner-card-actions button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 10px;
  background: rgba(255,255,255,.08);
  color: #fff;
}

.owner-card-actions button.danger {
  color: #ffaaaa;
  background: rgba(255,90,90,.08);
}

.owner-empty {
  min-height: 180px;
  border-radius: 18px;
  border: 1px dashed rgba(255,255,255,.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(244,244,240,.45);
}

.owner-empty p {
  margin: 0;
}

.owner-spin {
  animation: ownerSpin 1s linear infinite;
}

@keyframes ownerSpin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 700px) {
  .owner-dashboard-backdrop {
    padding: 10px;
  }

  .owner-dashboard {
    padding: 12px 0 40px;
  }

  .owner-login-card {
    padding: 28px 20px;
  }

  .owner-dashboard-header {
    flex-direction: column;
  }

  .owner-header-actions {
    width: 100%;
  }

  .owner-header-actions .owner-signout {
    flex: 1;
  }

  .owner-content-card {
    grid-template-columns: 1fr;
  }

  .owner-content-image {
    min-height: 190px;
  }

  .owner-content-image img {
    min-height: 190px;
  }

  .owner-section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
`;
