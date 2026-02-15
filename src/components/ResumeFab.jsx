import React from 'react'
import { FileText } from 'lucide-react'
import '../styles/ResumeFab.css'

const ResumeFab = () => {
    return (
        <a
            href="/Vaddi_Sai_Goutham_Product_Manager_Resume.pdf"
            download="Vaddi_Sai_Goutham_Resume.pdf"
            className="resume-fab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
        >
            <FileText size={24} />
            <span className="resume-fab__tooltip">Download Resume</span>
        </a>
    )
}

export default ResumeFab
