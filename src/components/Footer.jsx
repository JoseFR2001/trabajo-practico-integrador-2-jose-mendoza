const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <small>&copy; {year} José Mendoza. Todos los derechos reservados.</small>
    </footer>
  );
};

export default Footer;
