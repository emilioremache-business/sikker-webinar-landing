import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    cargo: '',
    sector: 'Financiero',
    mfa: 'No estoy seguro'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar');
      }

      setSubmitted(true);
      setFormData({
        nombre: '',
        email: '',
        empresa: '',
        cargo: '',
        sector: 'Financiero',
        mfa: 'No estoy seguro'
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img src="/logo-white.png" alt="Sikker" style={{height: '40px', marginRight: '10px'}} />
          <p style={styles.tagline}>Cybersecurity Company</p>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroLabel}>WEBINAR</p>
          <h1 style={styles.heroTitle}>Del Dato al Dinero</h1>
          <p style={styles.heroSubtitle}>La economía clandestina detrás del fraude financiero</p>
          <p style={styles.heroDescription}>
            Dark Web, Deep Web, ingeniería social y accesos seguros: entendiendo cómo atacan hoy las organizaciones financieras.
          </p>

          <div style={styles.eventDetails}>
            <div style={styles.eventDetailItem}>
              <span style={styles.eventDetailLabel}>📅 Fecha</span>
              <span style={styles.eventDetailValue}>Martes 22 Sept 2026</span>
            </div>
            <div style={styles.eventDetailItem}>
              <span style={styles.eventDetailLabel}>🕐 Hora</span>
              <span style={styles.eventDetailValue}>10H00 Ecuador</span>
            </div>
            <div style={styles.eventDetailItem}>
              <span style={styles.eventDetailLabel}>💻 Modalidad</span>
              <span style={styles.eventDetailValue}>Microsoft Teams</span>
            </div>
          </div>

          <div style={styles.speakers}>
            <div style={styles.speakerCard}>
              <p style={styles.speakerName}>Emilio Remache</p>
              <p style={styles.speakerRole}>Business Consultant</p>
              <p style={styles.speakerTag}>MODERADOR</p>
            </div>
            <div style={styles.speakerCard}>
              <p style={styles.speakerName}>Rubens Rodriguez</p>
              <p style={styles.speakerRole}>Seguridad Ofensiva</p>
              <p style={styles.speakerTag}>EXPOSITOR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section style={styles.formSection}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Regístrate al Webinar</h2>
          <p style={styles.formSubtitle}>Completa el formulario para asegurar tu lugar</p>

          {submitted && (
            <div style={styles.successMessage}>
              ✓ ¡Registrado exitosamente! Te enviaremos el link del webinar a tu email.
            </div>
          )}

          {error && (
            <div style={styles.errorMessage}>
              ✗ Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre Completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Corporativo *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@empresa.com"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Empresa *</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
                placeholder="Nombre de tu empresa"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Cargo *</label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
                placeholder="ej. CFO, CISO, Gerente de IT"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Sector *</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Financiero">Financiero</option>
                <option value="Gobierno">Gobierno</option>
                <option value="Salud">Salud</option>
                <option value="Automotriz">Automotriz</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>¿Tu empresa usa MFA (autenticación de doble factor)? *</label>
              <select
                name="mfa"
                value={formData.mfa}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
                <option value="No estoy seguro">No estoy seguro</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Registrando...' : 'REGÍSTRATE →'}
            </button>
          </form>

          <p style={styles.formFooter}>
            Tus datos son seguros y confidenciales. No compartiremos tu información.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Juntos hacemos un mundo más seguro</p>
        <p style={{ marginTop: '8px', opacity: 0.6 }}>© 2026 Sikker Cybersecurity Company. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    backgroundColor: '#0B1210',
    color: '#EAF2ED',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#000000',
    borderBottom: '1px solid #4BAEB2',
    padding: '20px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    color: '#FFFFFF',
    letterSpacing: '2px',
  },
  tagline: {
    fontSize: '12px',
    margin: 0,
    marginLeft: '10px',
    color: '#4BAEB2',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  hero: {
    backgroundColor: '#0B1210',
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(75, 174, 178, 0.1) 0%, transparent 50%)',
    padding: '80px 20px',
    textAlign: 'center',
    borderBottom: '1px solid rgba(75, 174, 178, 0.2)',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroLabel: {
    fontSize: '14px',
    letterSpacing: '4px',
    color: '#4BAEB2',
    fontWeight: '600',
    margin: '0 0 12px 0',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0 0 12px 0',
    color: '#FFFFFF',
    letterSpacing: '-1px',
    lineHeight: '1.1',
  },
  heroSubtitle: {
    fontSize: '24px',
    color: '#4BAEB2',
    margin: '0 0 20px 0',
    fontWeight: '500',
  },
  heroDescription: {
    fontSize: '16px',
    color: '#9FB3AA',
    margin: '0 0 40px 0',
    lineHeight: '1.6',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eventDetails: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#101916',
    borderRadius: '12px',
    border: '1px solid rgba(75, 174, 178, 0.2)',
  },
  eventDetailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  eventDetailLabel: {
    fontSize: '12px',
    color: '#64796F',
  },
  eventDetailValue: {
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: '600',
  },
  speakers: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  speakerCard: {
    backgroundColor: '#101916',
    border: '1px solid #4BAEB2',
    borderRadius: '10px',
    padding: '16px 24px',
    minWidth: '180px',
  },
  speakerName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    margin: '0 0 4px 0',
  },
  speakerRole: {
    fontSize: '13px',
    color: '#9FB3AA',
    margin: '0 0 8px 0',
  },
  speakerTag: {
    fontSize: '11px',
    color: '#4BAEB2',
    fontWeight: '700',
    letterSpacing: '1px',
    margin: 0,
  },
  formSection: {
    padding: '80px 20px',
    backgroundColor: '#0B1210',
  },
  formContainer: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#101916',
    border: '1px solid #4BAEB2',
    borderRadius: '12px',
    padding: '40px',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#FFFFFF',
  },
  formSubtitle: {
    fontSize: '14px',
    color: '#9FB3AA',
    margin: '0 0 30px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#EAF2ED',
  },
  input: {
    padding: '12px 16px',
    backgroundColor: '#0B1210',
    border: '1px solid #4BAEB2',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '12px 16px',
    backgroundColor: '#0B1210',
    border: '1px solid #4BAEB2',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '14px 20px',
    backgroundColor: '#4BAEB2',
    border: 'none',
    borderRadius: '8px',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    letterSpacing: '0.5px',
    transition: 'background-color 0.2s',
  },
  successMessage: {
    backgroundColor: 'rgba(0, 255, 65, 0.1)',
    border: '1px solid #00FF41',
    color: '#00FF41',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  errorMessage: {
    backgroundColor: 'rgba(232, 91, 48, 0.1)',
    border: '1px solid #E85B30',
    color: '#E85B30',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  formFooter: {
    fontSize: '12px',
    color: '#64796F',
    margin: '20px 0 0 0',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#000000',
    borderTop: '1px solid #4BAEB2',
    padding: '24px 20px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#4BAEB2',
    letterSpacing: '1px',
  },
};
