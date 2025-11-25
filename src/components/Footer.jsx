const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <small>&copy; {year} José Mendoza. Todos los derechos reservados.</small>
    </footer>
  );
};

export default Footer;
