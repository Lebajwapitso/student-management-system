import React, { useState } from "react";
import { loadStudents, saveStudents } from "./dataUtils";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import "./App.css";

function App() {
  // Customized baseline student profile map initializer
  const getInitialStudents = () => {
    const savedData = loadStudents();
    if (!savedData || savedData.length === 0) {
      const defaultList = [
        {
          id: "901026401",
          name: "Lethabo Mofokeng",
          age: 21,
          email: "lethabo.mofokeng@limkokwing.ac.ls",
          course: "Diploma in Business Information Technology",
          enrollmentStatus: "Active"
        },
        {
          id: "901026402",
          name: "Mpho Moroesi",
          age: 22,
          email: "mpho.moroesi@limkokwing.ac.ls",
          course: "Diploma in Business Information Technology",
          enrollmentStatus: "Active"
        },
        {
          id: "901026403",
          name: "Thabo Letsie",
          age: 20,
          email: "thabo.letsie@limkokwing.ac.ls",
          course: "Diploma in Information Technology",
          enrollmentStatus: "Active"
        },
        {
          id: "901026404",
          name: "Bokang Molapo",
          age: 23,
          email: "bokang.molapo@limkokwing.ac.ls",
          course: "Diploma in Business Information Technology",
          enrollmentStatus: "Inactive"
        },
        {
          id: "901026405",
          name: "Selloane Phamotse",
          age: 21,
          email: "selloane.phamotse@limkokwing.ac.ls",
          course: "Diploma in Information Technology",
          enrollmentStatus: "Active"
        },
        {
          id: "901026406",
          name: "Khotso Sekoati",
          age: 22,
          email: "khotso.sekoati@limkokwing.ac.ls",
          course: "Diploma in Business Information Technology",
          enrollmentStatus: "Active"
        },
      ];
      saveStudents(defaultList);
      return defaultList;
    }
    return savedData;
  };

  const [students, setStudents] = useState(getInitialStudents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openModal = (mode, student = null) => {
    setModalMode(mode);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveStudent = (formData) => {
    let updatedStudentsList;

    if (modalMode === "add") {
      const newIdString = `9010${Math.floor(10000 + Math.random() * 90000)}`;
      const newStudentRecord = { id: newIdString, ...formData };
      updatedStudentsList = [...students, newStudentRecord];
    } else if (modalMode === "edit") {
      updatedStudentsList = students.map((item) =>
        item.id === selectedStudent.id ? { ...item, ...formData } : item,
      );
    }

    setStudents(updatedStudentsList);
    saveStudents(updatedStudentsList);
    closeModal();
  };

  const handleDeleteConfirm = (studentId) => {
    const filteredList = students.filter((item) => item.id !== studentId);
    setStudents(filteredList);
    saveStudents(filteredList);
    closeModal();
  };

  return (
    <div className="dashboard-container">
      {/* 1. LMS SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Limkokwing</h2>
          <p className="sidebar-campus">Lesotho Campus</p>
          <p className="sidebar-location">Maseru, Lesotho</p>
        </div>
        <nav className="nav-menu">
          <a href="#" className="active">
            <span className="icon">📊</span> Dashboard
          </a>
          <a href="#">
            <span className="icon">🧑‍🎓</span> Student Registry
          </a>
          <a href="#">
            <span className="icon">📝</span> DBIT Courses
          </a>
          <a href="#">
            <span className="icon">💳</span> Fees & Accounts
          </a>
          <a href="#">
            <span className="icon">⚙️</span> Settings
          </a>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="main-content">
        {/* TOP HEADER STATUS PANEL */}
        <header className="top-header">
          <div className="header-brand">
            <h1>Lebajoa Pitso Student Portal</h1>
            <p className="subtitle">
              DIWA2110 Web Application Development System
            </p>
          </div>
          <div className="user-profile">
            <div className="avatar">LP</div>
            <div className="user-info-text">
              <span className="user-name">Lebajoa Pitso</span>
              <span className="user-role">DBIT Specialist</span>
            </div>
          </div>
        </header>

        {/* VISUAL SHOWCASE HERO BLOCK */}
        <section className="showcase-banner">
          <div className="banner-overlay">
            <h2>Empowering Innovation & Academic Excellence</h2>
            <p>
              From hands-on lab training sessions to global industry tech
              leaders—Limkokwing DBIT students are excelling worldwide.
            </p>
          </div>
        </section>

        {/* 3. MODERN CARD LAYOUT WITH IMAGE PANELS */}
        <section className="visual-dashboard-grid">
          <div className="stat-card data-card">
            <div className="stat-card-text">
              <h3>Active DBIT Students</h3>
              <p className="stat-number">{students.length}</p>
              <span className="stat-trend positive">+4% this semester</span>
            </div>
          </div>

          <div className="stat-card image-card-activity">
            <div className="card-image-overlay">
              <h4>Collaborative Learning</h4>
              <p>
                Students designing systems & signing documentation live in labs.
              </p>
            </div>
          </div>

          <div className="stat-card image-card-success">
            <div className="card-image-overlay">
              <h4>Global Outcomes</h4>
              <p>
                Graduates excelling in modern software engineering & network
                fields.
              </p>
            </div>
          </div>
        </section>

        {/* QUICK ACTION BUTTON */}
        <div className="action-bar-row">
          <button className="btn-add-primary" onClick={() => openModal("add")}>
            + Add New Student Record
          </button>
        </div>

        {/* 4. DATA TABLE HOUSING CARD */}
        <div className="card-wrapper">
          <div className="card-header">
            <h2>Registry Records Listing</h2>
          </div>

          <StudentTable
            students={students}
            onEdit={(student) => openModal("edit", student)}
            onDelete={(id) =>
              openModal(
                "delete",
                students.find((s) => s.id === id),
              )
            }
          />
        </div>
      </main>

      <StudentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        studentData={selectedStudent}
        onSave={handleSaveStudent}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default App;
