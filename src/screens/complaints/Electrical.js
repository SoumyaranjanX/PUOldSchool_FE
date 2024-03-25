import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "../../components/header/Header";
import { Feather } from "react-native-vector-icons";
import BottomBar from "../../components/bottombar/BottomBar";
import axios from "axios";

const Electrical = () => {
  const [studentID, setStudentID] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [complaintTypeModalVisible, setComplaintTypeModalVisible] =
    useState(false);
  const [selectedComplaintType, setSelectedComplaintType] = useState(null);
  const [selectedComplaintDescription, setSelectedComplaintDescription] =
    useState(null);
  const [showComplaintDescription, setShowComplaintDescription] =
    useState(false); // State to track dropdown visibility
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [fromTimeModalVisible, setFromTimeModalVisible] = useState(false);
  const [toTimeModalVisible, setToTimeModalVisible] = useState(false);
  const [selectedFromTime, setSelectedFromTime] = useState(null);
  const [selectedToTime, setSelectedToTime] = useState(null);

  const departments = [
    { name: "Information Technology", value: "IT" },
    { name: "Computer Science", value: "CS" },
    { name: "Mathematics", value: "Math" },
    { name: "ACADEMIC SECTION", value: "ACADEMIC SECTION" },
    { name: "ACADEMIC STAFF COLLEGE", value: "ACADEMIC STAFF COLLEGE" },
    { name: "ADMINISTRATION", value: "ADMINISTRATION" },
    { name: "ANTHROPOLOGY", value: "ANTHROPOLOGY" },
    { name: "APPLIED PSYCHOLOGY", value: "APPLIED PSYCHOLOGY" },
    { name: "ASIAN CHRISTIAN STUDIES", value: "ASIAN CHRISTIAN STUDIES" },
    { name: "ASTROPHYSICS", value: "ASTROPHYSICS" },
    { name: "BANKING TECHNOLOGY", value: "BANKING TECHNOLOGY" },
    {
      name: "BIOCHEMISTRY & MOLECULAR BIOLOGY",
      value: "BIOCHEMISTRY & MOLECULAR BIOLOGY",
    },
    { name: "BIOINFORMATICS", value: "BIOINFORMATICS" },
    { name: "BIOTECHNOLOGY", value: "BIOTECHNOLOGY" },
    {
      name: "CENTRAL WORKSHOP MAINTENANCE",
      value: "CENTRAL WORKSHOP MAINTENANCE",
    },
    { name: "CHEMISTRY", value: "CHEMISTRY" },
    { name: "CIF", value: "CIF" },
    {
      name: "COASTAL DISASTER MANAGEMENT",
      value: "COASTAL DISASTER MANAGEMENT",
    },
    { name: "COMMERCE", value: "COMMERCE" },
    { name: "COMMERCE - KARAIKAL", value: "COMMERCE - KARAIKAL" },
    { name: "COMMUNITY COLLEGE", value: "COMMUNITY COLLEGE" },
    { name: "COMPUTER CENTRE", value: "COMPUTER CENTRE" },
    { name: "COMPUTER SCIENCE", value: "COMPUTER SCIENCE" },
    { name: "COMPUTER SCIENCE- KARAIKAL", value: "COMPUTER SCIENCE- KARAIKAL" },
    { name: "CONTROLLER OF EXAM WING", value: "CONTROLLER OF EXAM WING" },
    { name: "DDE", value: "DDE" },
    { name: "DIRECTOR (C & CR)", value: "DIRECTOR (C & CR)" },
    { name: "DIRECTOR(SEI & RR)", value: "DIRECTOR(SEI & RR)" },
    { name: "EARTH SCIENCES", value: "EARTH SCIENCES" },
    { name: "ECOLOGY & ENVIRONMENTAL", value: "ECOLOGY & ENVIRONMENTAL" },
    { name: "ECONOMICS", value: "ECONOMICS" },
    { name: "ELECTRICAL WING", value: "ELECTRICAL WING" },
    {
      name: "ELECTRONIC MEDIA & MASS COMMUNICATION",
      value: "ELECTRONIC MEDIA & MASS COMMUNICATION",
    },
    { name: "ELECTRONICS ENGINEERING", value: "ELECTRONICS ENGINEERING" },
    { name: "ENGINEERING WING (CIVIL)", value: "ENGINEERING WING (CIVIL)" },
    { name: "ENGLISH", value: "ENGLISH" },
    { name: "ESTABLISHMENT", value: "ESTABLISHMENT" },
    { name: "EUROPEAN STUDIES", value: "EUROPEAN STUDIES" },
    { name: "FINANCE OFFICER", value: "FINANCE OFFICER" },
    { name: "FINANCE SECTION", value: "FINANCE SECTION" },
    { name: "FOOD SCIENCE & TECHNOLOGY", value: "FOOD SCIENCE & TECHNOLOGY" },
    { name: "FOREIGN LANGUAGES", value: "FOREIGN LANGUAGES" },
    { name: "FRENCH", value: "FRENCH" },
    { name: "GREEN ENERGY TECHNOLOGY", value: "GREEN ENERGY TECHNOLOGY" },
    { name: "HINDI", value: "HINDI" },
    { name: "HISTORY", value: "HISTORY" },
    { name: "HORTICULTURE", value: "HORTICULTURE" },
    { name: "INTERNAL AUDIT OFFICE", value: "INTERNAL AUDIT OFFICE" },
    { name: "INTERNATIONAL BUSINESS", value: "INTERNATIONAL BUSINESS" },
    { name: "IQAC", value: "IQAC" },
    { name: "LEGAL CELL", value: "LEGAL CELL" },
    { name: "LIBRARY", value: "LIBRARY" },
    {
      name: "LIBRARY & INFORMATION SCIENCE",
      value: "LIBRARY & INFORMATION SCIENCE",
    },
    { name: "LIBRARY- KARAIKAL", value: "LIBRARY- KARAIKAL" },
    { name: "MANAGEMENT STUDIES", value: "MANAGEMENT STUDIES" },
    {
      name: "MANAGEMENT STUDIES - KARAIKAL",
      value: "MANAGEMENT STUDIES - KARAIKAL",
    },
    { name: "MASS COMMUNICATION", value: "MASS COMMUNICATION" },
    { name: "MATHEMATICS", value: "MATHEMATICS" },
    { name: "MEDICAL SCIENCES", value: "MEDICAL SCIENCES" },
    { name: "MICROBIOLOGY", value: "MICROBIOLOGY" },
    { name: "NANO SCIENCES & TECHNOLOGY", value: "NANO SCIENCES & TECHNOLOGY" },
    {
      name: "OCEAN STUDIES AND MARINE BIOLOGY",
      value: "OCEAN STUDIES AND MARINE BIOLOGY",
    },
    { name: "PERFORMING ARTS", value: "PERFORMING ARTS" },
    { name: "PHILOSOPHY", value: "PHILOSOPHY" },
    {
      name: "PHYSICAL EDUCATION & SPORTS",
      value: "PHYSICAL EDUCATION & SPORTS",
    },
    { name: "PHYSICS", value: "PHYSICS" },
    { name: "PLACEMENT CELL", value: "PLACEMENT CELL" },
    { name: "PLANNING & DEVELOPMENT", value: "PLANNING & DEVELOPMENT" },
    { name: "POLITICS AND INTERNATIONAL", value: "POLITICS AND INTERNATIONAL" },
    { name: "POLLUTION CONTROL", value: "POLLUTION CONTROL" },
    { name: "PUBLIC RELATIONS OFFICE", value: "PUBLIC RELATIONS OFFICE" },
    { name: "PUDUVAI VANI", value: "PUDUVAI VANI" },
    { name: "RECRUITMENT CELL", value: "RECRUITMENT CELL" },
    { name: "REGISTAR SECRETARIAT", value: "REGISTAR SECRETARIAT" },
    { name: "SANSKRIT", value: "SANSKRIT" },
    { name: "SCHOOL OF EDUCATION", value: "SCHOOL OF EDUCATION" },
    { name: "SCHOOL OF TAMIL", value: "SCHOOL OF TAMIL" },
    { name: "SOCIAL WORK", value: "SOCIAL WORK" },
    { name: "SOCIOLOGY", value: "SOCIOLOGY" },
    { name: "SOUTHERN ASIA STUDIES", value: "SOUTHERN ASIA STUDIES" },
    { name: "SPECIAL CELL", value: "SPECIAL CELL" },
    { name: "STATISTICS", value: "STATISTICS" },
    { name: "STUDENT SERVICE CENTRE", value: "STUDENT SERVICE CENTRE" },
    { name: "STUDY INDIA PROGRAMME", value: "STUDY INDIA PROGRAMME" },
    {
      name: "STUDY OF SOCIAL EXCLUSION & INCLUSIVE POLICY",
      value: "STUDY OF SOCIAL EXCLUSION & INCLUSIVE POLICY",
    },
    { name: "TOURISM STUDIES", value: "TOURISM STUDIES" },
    { name: "TRANSPORT SECTION", value: "TRANSPORT SECTION" },
    { name: "WOMENS STUDIES", value: "WOMENS STUDIES" },
    { name: "UMISARC", value: "UMISARC" },
    {
      name: "VICE-CHANCELLOR SECRETARIAT",
      value: "VICE-CHANCELLOR SECRETARIAT",
    },
    { name: "VIGILANCE & SECURITY", value: "VIGILANCE & SECURITY" },
  ];

  const courses = [
    { name: "Select", value: "" },
    { name: "M.Sc.", value: "COU001" },
    { name: "M.C.A.", value: "COU002" },
    { name: "M.TECH", value: "COU003" },
    { name: "PHD", value: "COU004" },
    { name: "MA", value: "COU005" },
    { name: "PGDIPLOMA", value: "COU006" },
  ];

  const locations = [
    { name: "ACADEMIC STAFF COLLEGE BLOCK (UGC)", value: "A050" },
    { name: "ADMINISTRATIVE BUILDING", value: "A001" },
    { name: "AMUDHAM MEGA MESS", value: "A034" },
    { name: "ANIMAL HOUSE", value: "A043" },
    { name: "ASC HOSTEL", value: "bh013" },
    { name: "BHARATHIDASAN HOSTEL", value: "bh015" },
    { name: "BIO INFORMATICS BLOCK", value: "A063" },
    { name: "BIO-TECHNOLOGY BLOCK", value: "A013" },
    { name: "BIRSA MUNDA HOSTEL - BLOCK A", value: "GH012" },
    { name: "BIRSA MUNDA HOSTEL - BLOCK B", value: "GH013" },
    { name: "BOYS HOSTEL OFFICE", value: "bh020" },
    { name: "BROWSING ROOM", value: "A062" },
    { name: "C.V.RAMAN  HOSTEL", value: "bh007" },
    { name: "CANTEEN-I", value: "A031" },
    { name: "CANTEEN-II", value: "A032" },
    { name: "CANTEEN-III (IRTC)", value: "A033" },
    { name: "CAUVERY  HOSTEL", value: "GH003" },
    { name: "CCTV control room", value: "A097" },
    { name: "CENTRAL LIBRARY", value: "A011" },
    { name: "CHEMISTRY BLOCK", value: "A055" },
    { name: "CIF", value: "A045" },
    { name: "CMW", value: "A040" },
    { name: "COMPUTER CENTRE", value: "A002" },
    { name: "DAY CARE", value: "A010" },
    { name: "DDE BLOCK", value: "A030" },
    { name: "Dean office SOM", value: "A098" },
    { name: "DMS BLOCK", value: "A026" },
    { name: "DRIVER REST ROOM", value: "A088" },
    { name: "EARTH SCIENCE BLOCK", value: "A007" },
    { name: "ELECTRONIC MEDIA AND MASS COMMUNICATION", value: "A016" },
    { name: "EXAMINATION WING BLOCK", value: "A009" },
    { name: "FOOD SCIENCE BLOCK", value: "A015" },
    { name: "FOREIGN STUDENT  HOSTEL", value: "bh012" },
    { name: "GANGA  HOSTEL", value: "GH004" },
    { name: "GIRLS HOSTEL OFFICE", value: "GH007" },
    { name: "GREEN-ENERGY BLOCK", value: "A014" },
    { name: "GUEST HOUSE-I", value: "A037" },
    { name: "GUEST HOUSE-II", value: "A036" },
    { name: "GUEST ROOM I", value: "A059" },
    { name: "GUEST ROOM II", value: "A060" },
    { name: "GUEST ROOM III", value: "A061" },
    { name: "GYM GENTS", value: "A041" },
    { name: "GYM LADIES", value: "A042" },
    { name: "HEALTH CENTRE", value: "A029" },
    { name: "HORTICULTURAL WING", value: "A089" },
    { name: "HR-TEM BUILDING", value: "A091" },
    { name: "ILANGO  HOSTEL", value: "bh009" },
    { name: "INTERNET CONTROL ROOM", value: "A068" },
    { name: "IPLS BUILDING", value: "A065" },
    { name: "KABIRDAS  HOSTEL", value: "bh003" },
    { name: "KALIDASS HOSTEL", value: "bh001" },
    { name: "KALPANA CHAWALA  HOSTEL", value: "GH005" },
    { name: "KAMBAN  HOSTEL", value: "bh004" },
    { name: "KANNADASAN HOSTEL", value: "bh002" },
    { name: "KANNAGI HOSTEL - BLOCK A", value: "GH009" },
    { name: "KANNAGI HOSTEL - BLOCK B", value: "GH010" },
    { name: "KANNAGI HOSTEL - BLOCK C", value: "GH011" },
    { name: "KARAIKAL ACADEMIC BLOCK", value: "A051" },
    { name: "KARAIKAL ADMINISTRATIVE BLOCK", value: "A018" },
    { name: "KARAIKAL GUEST HOUSE", value: "A054" },
    { name: "KARAIKAL LADIES HOSTEL", value: "A052" },
    { name: "KARAIKAL MAIN GATE APPROACH ROAD", value: "A094" },
    { name: "KARAIKAL MAIN GATE SECURITY CABIN", value: "A093" },
    { name: "KARAIKAL MENS HOSTEL1", value: "bh018" },
    { name: "KARAIKAL MENS HOSTEL2", value: "bh019" },
    { name: "KARAIKAL OFFICE of THE CENTRE HEAD", value: "A092" },
    { name: "LECTURE HALL-I", value: "A005" },
    { name: "LECTURE HALL-II", value: "A006" },
    { name: "LIBRARY ANNEXE", value: "A066" },
    { name: "MADAME CURIE  HOSTEL", value: "GH006" },
    { name: "MADAME CURIE  HOSTEL (Annexure)", value: "GH008" },
    { name: "MATHEMATICS & STATISTICS  BLOCK", value: "A023" },
    { name: "MMTTC", value: "A099" },
    { name: "MOTHER TERESA MEGA MESS", value: "A035" },
    { name: "MOULANA ABDUL KALAM  HOSTEL", value: "bh010" },
    { name: "NARMADHA HOSTEL", value: "A096" },
    { name: "PHYSICAL EDUCATION BLOCK", value: "A012" },
    { name: "PHYSICS", value: "A022" },
    { name: "POLLUTION CONTROL", value: "A044" },
    { name: "PRE PRIMARY SCHOOL", value: "A087" },
    { name: "PROJECT CELL", value: "A095" },
    { name: "PUDUVAI VANI", value: "A057" },
    { name: "PUMP HOUSE", value: "A067" },
    { name: "PURCHASE & STORES", value: "A027" },
    { name: "PURCHASE SECTION", value: "A064" },
    { name: "QUARTERS - F", value: "Q006" },
    { name: "QUARTERS -A", value: "Q001" },
    { name: "QUARTERS -B", value: "Q002" },
    { name: "QUARTERS -C", value: "Q003" },
    { name: "QUARTERS -D", value: "Q004" },
    { name: "QUARTERS -E", value: "Q005" },
    { name: "QUARTERS -G", value: "Q007" },
    { name: "RAJIV GANDHI STADIUM", value: "A021" },
    { name: "RECREATION HALL BHARATHIDASAN HOSTEL", value: "A072" },
    { name: "RECREATION HALL ILLANGO ADIGAL HOSTEL", value: "A069" },
    { name: "RECREATION HALL KABIRDAS HOSTEL", value: "A070" },
    { name: "RECREATION HALL KANNADASAN HOSTEL", value: "A071" },
    { name: "RECREATION HALL TAGORE HOSTEL", value: "A074" },
    { name: "RECREATION HALL VALMIKI HOSTEL", value: "A073" },
    { name: "RECREATION HALL CAUVERY HOSTEL", value: "A082" },
    { name: "RECREATION HALL GANGA HOSTEL", value: "A084" },
    { name: "RECREATION HALL KALIDAS HOSTEL", value: "A076" },
    { name: "RECREATION HALL KALPANA CHAWLA HOSTEL", value: "A081" },
    { name: "RECREATION HALL KAMBAN HOSTEL", value: "A077" },
    { name: "RECREATION HALL MADAME CURIE HOSTEL", value: "A080" },
    { name: "RECREATION HALL MOULANA ABUL KALAM HOSTEL", value: "A078" },
    { name: "RECREATION HALL S.R.K HOSTEL", value: "A079" },
    { name: "RECREATION HALL SARASWATHY HOSTEL", value: "A083" },
    { name: "RECREATION HALL SUBRAMANIA BHARATHIAR HOSTEL", value: "A075" },
    { name: "RECREATION HALL YAMUNA HOSTEL", value: "A085" },
    { name: "S.R.K HOSTEL", value: "bh006" },
    { name: "SARASWATHI HOSTEL", value: "GH001" },
    { name: "SCHOOL OF DRAMA", value: "A038" },
    { name: "SCHOOL OF HUMANITIES BLOCK", value: "A024" },
    { name: "SCHOOL OF MANAGEMENT BLOCK", value: "A008" },
    {
      name: "SCHOOL OF SOCIAL SCIENCES & INTERNATIONAL STUDIES",
      value: "A017",
    },
    { name: "SCHOOL OF TAMIL BLOCK", value: "A019" },
    { name: "SCIENCE BLOCK-I", value: "A003" },
    { name: "SCIENCE BLOCK-II", value: "A004" },
    { name: "SECURITY GATE-I", value: "A047" },
    { name: "SECURITY GATE-II", value: "A048" },
    { name: "SECURITY GATE-III", value: "A049" },
    { name: "SERVICE BUILDING (INDIAN BANK)", value: "A039" },
    { name: "SPECIAL CELL BLOCK", value: "A025" },
    { name: "SRI AUROBINDO HOSTEL", value: "bh017" },
    { name: "SUB-STATION", value: "A056" },
    { name: "SUBRAMANIYA BHARATHI HOSTEL", value: "bh016" },
    { name: "TAGORE HOSTEL", value: "bh014" },
    { name: "THIRUVALLUVAR STADIUM", value: "A028" },
    { name: "TRANSIT HOSTEL", value: "bh011" },
    { name: "UMISARC", value: "A020" },
    { name: "V.C RESIDENCE", value: "A046" },
    { name: "VALMIKI HOSTEL", value: "bh008" },
    { name: "VINAYAGAR TEMPLE", value: "A090" },
    { name: "WOMENS STUDIES HOSTEL", value: "A086" },
    { name: "YAMUNA HOSTEL", value: "GH002" },
  ];

  const complaintTypes = [
    { value: "CT001", name: "Electrical" },
    { value: "CT003", name: "TelePhone/Fax/Intercom" },
    { value: "CT004", name: "Lift" },
    { value: "CT006", name: "Air Conditioner" },
    { value: "CT007", name: "Water Cooler" },
    { value: "CT008", name: "UPS" },
  ];

  const complaintDescriptions = {
    CT001: [
      { value: "Ceiling fan not Working", name: "Ceiling fan not Working" },
      {
        value: "Ceiling fan running slowly",
        name: "Ceiling fan running slowly",
      },
      { value: "Ceiling fan making noise", name: "Ceiling fan making noise" },
      { value: "Fan Regulator not working", name: "Fan Regulator not working" },
      { value: "Exhaust fan not working", name: "Exhaust fan not working" },
      { value: "Exhaust fan making noise", name: "Exhaust fan making noise" },
      { value: "Tube light not glowing", name: "Tube light not glowing" },
      { value: "Tube light flickering", name: "Tube light flickering" },
      { value: "CFL not working", name: "CFL not working" },
      { value: "Plug point not working", name: "Plug point not working" },
      { value: "Plug point burnt out", name: "Plug point burnt out" },
      {
        value: "Corridor light not working",
        name: "Corridor light not working",
      },
      { value: "Street light not working", name: "Street light not working" },
      { value: "Garden light not working", name: "Garden light not working" },
      { value: "MCB frequently tripping", name: "MCB frequently tripping" },
      {
        value: "Need Additional Power Point",
        name: "Need Additional Power Point",
      },
      { value: "Water Heater", name: "Water Heater" },
      { value: "Toilet light not glowing", name: "Toilet light not glowing" },
      { value: "Switch Not Working", name: "Switch Not Working" },
    ],
    CT003: [
      { value: "Not working", name: "Not working" },
      { value: "Outgoing problem", name: "Outgoing problem" },
      { value: "Incoming problem", name: "Incoming problem" },
      { value: "Zero dial not working", name: "Zero dial not working" },
      { value: "Noise", name: "Noise" },
    ],
    CT004: [
      { value: "Not working", name: "Not working" },
      { value: "Door not opening", name: "Door not opening" },
      {
        value: "Automatic Rescue Device ARD not work",
        name: "Automatic Rescue Device ARD not work",
      },
      {
        value: "Mal function / level change",
        name: "Mal function / level change",
      },
      { value: "Lift fan not working", name: "Lift fan not working" },
      { value: "Lift light not function", name: "Lift light not function" },
    ],
    CT006: [
      { value: "AC unit not working", name: "AC unit not working" },
      {
        value: "Noise during indoor operation",
        name: "Noise during indoor operation",
      },
      {
        value: "Noise during outdoor operation",
        name: "Noise during outdoor operation",
      },
      { value: "No cooling", name: "No cooling" },
      { value: "Stabilizer not working", name: "Stabilizer not working" },
      { value: "Remote not working", name: "Remote not working" },
      { value: "Water leakage", name: "Water leakage" },
    ],
    CT007: [
      { value: "Cooler not working", name: "Cooler not working" },
      { value: "Cooler making noise", name: "Cooler making noise" },
      { value: "Cold water not coming", name: "Cold water not coming" },
      { value: "Hot water not coming", name: "Hot water not coming" },
      { value: "Water not coming", name: "Water not coming" },
      { value: "Water tray block", name: "Water tray block" },
      { value: "Water leakage", name: "Water leakage" },
    ],
    CT008: [
      { value: "Output low trip", name: "Output low trip" },
      { value: "Output high trip", name: "Output high trip" },
      { value: "Over load trip", name: "Over load trip" },
      { value: "DC low trip", name: "DC low trip" },
      { value: "DC high trip", name: "DC high trip" },
      { value: "No Battery backup", name: "No Battery backup" },
      { value: "Beep Sound", name: "Beep Sound" },
      { value: "No Output", name: "No Output" },
    ],
    // Add more complaint types and their descriptions here
  };

  const priorities = [
    { name: "Low", value: "CP001" },
    { name: "Medium", value: "CP002" },
    { name: "High", value: "CP003" },
    { name: "Critical", value: "CP004" },
  ];

  const timeSlots = [
    { name: "9.00 AM", value: "9:00 AM" },
    { name: "10.00 AM", value: "10:00 AM" },
    { name: "11.00 AM", value: "11:00 AM" },
    { name: "12.00 PM", value: "12:00 PM" },
    { name: "1.00 PM", value: "1:00 PM" },
    { name: "2.00 PM", value: "2:00 PM" },
    { name: "3.00 PM", value: "3:00 PM" },
    { name: "4.00 PM", value: "4:00 PM" },
    { name: "5.00 PM", value: "5:00 PM" },
    { name: "6.00 PM", value: "6:00 PM" },
    { name: "7.00 PM", value: "7:00 PM" },
  ];

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    dropdownButton: {
      backgroundColor: "#f3f3f3",
      padding: 15,
      borderRadius: 10,
      marginTop: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      maxHeight: 900,
      maxWidth: 400,
    },
    modalOption: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginVertical: 5,
      marginHorizontal: 5,
      borderRadius: 8,
      backgroundColor: "#f3f3f3",
    },
    modalOptionText: {
      fontSize: 16,
      color: "#333",
    },
  });

  // Function to handle department selection
  const handleDepartmentSelect = (departmentValue) => {
    const selectedDepartment = departments.find(
      (department) => department.value === departmentValue
    );
    setSelectedDepartment(selectedDepartment);
    setDepartmentModalVisible(false);
  };

  // Function to handle course selection
  const handleCourseSelect = (courseValue) => {
    const selectedCourse = courses.find(
      (course) => course.value === courseValue
    );
    setSelectedCourse(selectedCourse);
    setCourseModalVisible(false);
  };

  // Function to handle location selection
  const handleLocationSelect = (locationValue) => {
    const selectedLocation = locations.find(
      (loc) => loc.value === locationValue
    );
    setSelectedLocation(selectedLocation);
    setLocationModalVisible(false);
  };

  const handleComplaintTypeSelect = (type) => {
    setSelectedComplaintType(type);
    setComplaintTypeModalVisible(false);
    setShowComplaintDescription(false); // Hide the complaint description dropdown when a new type is selected
    setSelectedComplaintDescription(null); // Reset the selected description
  };
  // Function to handle priority selection
  const handlePrioritySelect = (priorityValue) => {
    const selectedPriority = priorities.find((p) => p.value === priorityValue);
    setSelectedPriority(selectedPriority);
    setPriorityModalVisible(false);
  };
  // Function to handle time selection
  const handleFromTimeSelect = (time) => {
    setSelectedFromTime(time);
    setFromTimeModalVisible(false);
  };

  const handleToTimeSelect = (time) => {
    setSelectedToTime(time);
    setToTimeModalVisible(false);
  };

  const handleModalDismiss = (setVisible) => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    const URL = `https://backup.pondiuni.edu.in/services/eems/complaintform_student_insert.php`;

    try {
      const response = await axios.post(URL, {
        studentID,
        name,
        email,
        phone,
        department: selectedDepartment ? selectedDepartment.value : null,
        course: selectedCourse ? selectedCourse.value : null,
        location: selectedLocation ? selectedLocation.value : null,
        roomNo,
        complaintType: selectedComplaintType
          ? selectedComplaintType.value
          : null,
        complaintDescription: selectedComplaintDescription
          ? selectedComplaintDescription.value
          : null,
        priority: selectedPriority ? selectedPriority.value : null,
        fromTime: selectedFromTime ? selectedFromTime.value : null,
        toTime: selectedToTime ? selectedToTime.value : null,
      });
      console.log("Response:", response.status);

      // Resetting state variables after successful submission
      setStudentID("");
      setName("");
      setEmail("");
      setPhone("");
      setSelectedDepartment(null);
      setSelectedCourse(null);
      setSelectedLocation(null);
      setRoomNo("");
      setSelectedComplaintType(null);
      setSelectedComplaintDescription(null);
      setSelectedPriority(null);
      setSelectedFromTime(null);
      setSelectedToTime(null);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={"#F08E0F"} />
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1, paddingBottom: 10 }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                padding: 15,
                marginVertical: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#F08E0F",
                shadowColor: "gray",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Electrical Complaint Form
              </Text>

              <View style={{ padding: 15, marginTop: 20 }}>
                <Text>Student ID:</Text>
                <TextInput
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                  placeholder="University ID CARD"
                  value={studentID}
                  onChangeText={setStudentID}
                />

                <Text>Name:</Text>
                <TextInput
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={setName}
                />

                <Text>Email:</Text>
                <TextInput
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                  placeholder="example@domain.com"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text>Phone:</Text>
                <TextInput
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                  placeholder="0000000000"
                  value={phone}
                  onChangeText={setPhone}
                />

                <Text>Room No/Floor:</Text>
                <TextInput
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                  placeholder="Provide your allotted room number"
                  value={roomNo}
                  onChangeText={setRoomNo}
                />

                <Text>Department:</Text>
                <TouchableOpacity
                  onPress={() => setDepartmentModalVisible(true)}
                  style={styles.dropdownButton}
                >
                  <Text>
                    {selectedDepartment
                      ? selectedDepartment.name
                      : "Select Department"}
                  </Text>
                </TouchableOpacity>

                {/* Department selection modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={departmentModalVisible}
                  onRequestClose={() => setDepartmentModalVisible(false)}
                >
                  <TouchableWithoutFeedback
                    onPress={() => setDepartmentModalVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <ScrollView
                        contentContainerStyle={styles.scrollView}
                        style={styles.modalContent}
                      >
                        {departments.map((department, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              handleDepartmentSelect(department.value);
                              setDepartmentModalVisible(false);
                            }}
                            style={styles.modalOption}
                          >
                            <Text style={styles.modalOptionText}>
                              {department.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>

                <Text>Course:</Text>
                <TouchableOpacity
                  onPress={() => setCourseModalVisible(true)}
                  style={styles.dropdownButton}
                >
                  <Text>
                    {selectedCourse ? selectedCourse.name : "Select Course"}
                  </Text>
                </TouchableOpacity>

                {/* Course selection modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={courseModalVisible}
                  onRequestClose={() => setCourseModalVisible(false)}
                >
                  <TouchableWithoutFeedback
                    onPress={() => setCourseModalVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        {courses.map((course, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleCourseSelect(course.value)}
                            style={styles.modalOption}
                          >
                            <Text style={styles.modalOptionText}>
                              {course.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>

                <Text>Location:</Text>
                <TouchableOpacity
                  onPress={() => setLocationModalVisible(true)}
                  style={styles.dropdownButton}
                >
                  <Text>
                    {selectedLocation
                      ? selectedLocation.name
                      : "Select Location"}
                  </Text>
                </TouchableOpacity>

                {/* Location selection modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={locationModalVisible}
                  onRequestClose={() => setLocationModalVisible(false)}
                >
                  <TouchableWithoutFeedback
                    onPress={() => setLocationModalVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <ScrollView style={styles.modalContent}>
                        {locations.map((location, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleLocationSelect(location.value)}
                            style={styles.modalOption}
                          >
                            <Text style={styles.modalOptionText}>
                              {location.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>

                <View>
                  <Text>Complaint Type:</Text>
                  <TouchableOpacity
                    onPress={() => setComplaintTypeModalVisible(true)}
                    style={styles.dropdownButton}
                  >
                    <Text>
                      {selectedComplaintType
                        ? selectedComplaintType.name
                        : "Select"}
                    </Text>
                  </TouchableOpacity>

                  {/* Complaint type selection modal */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={complaintTypeModalVisible}
                    onRequestClose={() => setComplaintTypeModalVisible(false)}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => setComplaintTypeModalVisible(false)}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          {complaintTypes.map((complaintType) => (
                            <TouchableOpacity
                              key={complaintType.value}
                              onPress={() => {
                                handleComplaintTypeSelect(complaintType);
                                setShowComplaintDescription(true); // Show the complaint description dropdown after selecting a type
                              }}
                              style={styles.modalOption}
                            >
                              <Text style={styles.modalOptionText}>
                                {complaintType.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
                </View>

                {/* Render complaint description dropdown */}
                {selectedComplaintType && (
                  <View style={{ marginTop: 10 }}>
                    <Text>Complaint Description:</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setShowComplaintDescription(!showComplaintDescription)
                      }
                      style={styles.dropdownButton}
                    >
                      <Text>
                        {selectedComplaintDescription
                          ? selectedComplaintDescription.name
                          : "Select"}
                      </Text>
                    </TouchableOpacity>
                    {/* Render complaint description options */}
                    {showComplaintDescription && (
                      <View>
                        {complaintDescriptions[selectedComplaintType.value].map(
                          (description) => (
                            <TouchableOpacity
                              key={description.value}
                              onPress={() => {
                                setSelectedComplaintDescription(description);
                                setShowComplaintDescription(false); // Hide the complaint description dropdown after selection
                              }}
                              style={styles.modalOption}
                            >
                              <Text style={styles.modalOptionText}>
                                {description.name}
                              </Text>
                            </TouchableOpacity>
                          )
                        )}
                      </View>
                    )}
                  </View>
                )}

                <Text>Priority:</Text>
                <TouchableOpacity
                  onPress={() => setPriorityModalVisible(true)}
                  style={styles.dropdownButton}
                >
                  <Text>
                    {selectedPriority
                      ? selectedPriority.name
                      : "Select Priority"}
                  </Text>
                </TouchableOpacity>

                {/* Priority selection modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={priorityModalVisible}
                  onRequestClose={() => setPriorityModalVisible(false)}
                >
                  <TouchableWithoutFeedback
                    onPress={() => setPriorityModalVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        {priorities.map((priority, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handlePrioritySelect(priority.value)}
                            style={styles.modalOption}
                          >
                            <Text style={styles.modalOptionText}>
                              {priority.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <Text>Available Time:</Text>
                    <TouchableOpacity
                      onPress={() => setFromTimeModalVisible(true)}
                      style={styles.dropdownButton}
                    >
                      <Text>
                        {selectedFromTime ? selectedFromTime.name : "From"}
                      </Text>
                    </TouchableOpacity>

                    {/* From time selection modal */}
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={fromTimeModalVisible}
                      onRequestClose={() => setFromTimeModalVisible(false)}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => setFromTimeModalVisible(false)}
                      >
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContent}>
                            {timeSlots.map((time, index) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  handleFromTimeSelect(time);
                                  setFromTimeModalVisible(false);
                                }}
                                style={styles.modalOption}
                              >
                                <Text style={styles.modalOptionText}>
                                  {time.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                  </View>

                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text>&nbsp;</Text>
                    <TouchableOpacity
                      onPress={() => setToTimeModalVisible(true)}
                      style={styles.dropdownButton}
                    >
                      <Text>{selectedToTime ? selectedToTime.name : "To"}</Text>
                    </TouchableOpacity>

                    {/* To time selection modal */}
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={toTimeModalVisible}
                      onRequestClose={() => setToTimeModalVisible(false)}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => setToTimeModalVisible(false)}
                      >
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContent}>
                            {timeSlots.map((time, index) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  handleToTimeSelect(time);
                                  setToTimeModalVisible(false);
                                }}
                                style={styles.modalOption}
                              >
                                <Text style={styles.modalOptionText}>
                                  {time.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "#0f9d58",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 15,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <TouchableOpacity
                  onPress={handleReset}
                  style={{
                    backgroundColor: "#f00",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 15,
                    borderRadius: 8,
                    flex: 1,
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 15, fontWeight: "700" }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        </View>
        <BottomBar />
      </View>
    </>
  );
};

export default Electrical;
