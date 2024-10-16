import './About.css';
import { FaGithub, FaFolder, FaLinkedin } from 'react-icons/fa';

export default function About() {
  return (
    <div className='about-joy'>
      <div>Joy O’Halloran</div>
      <a target='_blank' rel='noreferrer' href='https://github.com/ohalloranjm'>
        <FaGithub />
      </a>
      <a
        target='_blank'
        rel='noreferrer'
        href='https://www.linkedin.com/in/joy-ohalloran/'
      >
        <FaLinkedin />
      </a>
      <a target='_blank' rel='noreferrer' href='https://ohalloranjm.github.io/'>
        <FaFolder />
      </a>
    </div>
  );
}
