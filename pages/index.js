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

      // Reset mensaje después de 5 segundos
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
          <h2 style={styles.logo}>SIKKER</h2>
          <p style={styles.tagline}>Cybersecurity Company</p>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>De la Identidad al Apagón</h1>
          <p style={styles.heroSubtitle}>Cómo 3 Semanas Destruyen un Banco</p>
          <p style={styles.heroDescription}>
            Descubre cómo los atacantes acceden a tu empresa en secreto y cómo protegerte.
          </p>
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
            {/* Nombre */}
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

            {/* Email */}
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

            {/* Empresa */}
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

            {/* Cargo */}
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

            {/* Sector */}
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

            {/* MFA */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Registrando...' : 'REGISTRARME AL WEBINAR'}
            </button>
          </form>

          <p style={styles.formFooter}>
            Tus datos son seguros y confidenciales. No compartiremos tu información.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2024 Sikker Cybersecurity Company. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// Estilos
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
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#FFFFFF',
    letterSpacing: '-1px',
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
    margin: '0',
    lineHeight: '1.6',
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
    padding: '20px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#64796F',
  },
};
