import { useState } from "react";
import styles from './index.module.css';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = ({
  scrollDown,
  headerSection,
  projectSection,
  timelineSection,
  certificatesSection,
  contactSection
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = (ref) => {
    scrollDown(ref);
  };

  return (
    <nav className="bg-primary">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img src="./Mainlogo.png" alt="#" height={40} width={40} />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            <button className={styles.butt_nav} onClick={() => handleScroll(headerSection.current)}>
              About
            </button>
            <button className={styles.butt_nav} onClick={() => handleScroll(projectSection.current)}>
              Projects
            </button>
            <button className={styles.butt_nav} onClick={() => handleScroll(timelineSection.current)}>
              Experience
            </button>
            <button className={styles.butt_nav} onClick={() => handleScroll(certificatesSection.current)}>
              Certificates
            </button>
            <button className={styles.butt_nav} onClick={() => handleScroll(contactSection.current)}>
              Contact
            </button>

            </div>
          </div>

          <div className="mr-2 flex md:hidden justify-end">
            <button
              onClick={() => toggleMenu()}
              type="button"
              className={styles.butt_menu}
              aria-expanded="false"
            >
              <AiOutlineMenu className={`${isOpen ? 'hidden' : 'block'}`} />
              <AiOutlineClose className={`${isOpen ? 'block' : 'hidden'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <button className={styles.butt_nav} onClick={() => handleScroll(headerSection.current)}>
          About
        </button>
        <button className={styles.butt_nav} onClick={() => handleScroll(projectSection.current)}>
          Projects
        </button>
        <button className={styles.butt_nav} onClick={() => handleScroll(timelineSection.current)}>
          Experience
        </button>
        <button className={styles.butt_nav} onClick={() => handleScroll(certificatesSection.current)}>
          Certificates
        </button>
        <button className={styles.butt_nav} onClick={() => handleScroll(contactSection.current)}>
          Contact
        </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
