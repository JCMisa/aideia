export const samplePeople = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

export const navItemsHome = [
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "Pricing",
    link: "#pricing",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export const navItemsDashboard = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "History",
    link: "/session/history",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const doctorImages = [
  "https://i.ibb.co/0RVK6TJX/doctor7.png",
  "https://i.ibb.co/XZ847WWC/doctor8.png",
  "https://i.ibb.co/gbcxn4yT/doctor9.png",
  "https://i.ibb.co/MDr4g84t/doctor10.png",
  "https://i.ibb.co/PzfjDFRC/doctor1.png",
  "https://i.ibb.co/fzZF3NnY/doctor2.png",
  "https://i.ibb.co/XkD3x6zr/doctor3.png",
  "https://i.ibb.co/bRzyrm2n/doctor4.png",
  "https://i.ibb.co/Z1VFxsV7/doctor5.png",
  "https://i.ibb.co/3m0gVQ4Y/doctor6.png",
];

export const sampleDoctors: DoctorType[] = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialist: "General Physician",
    image: doctorImages[8], // doctor2.png - female doctor
    description: "Helps with everyday health concerns and common symptoms.",
    agentPrompt:
      "You are Dr. Emily Johnson, a friendly and approachable General Physician AI. Start by asking about the patient's current symptoms and overall health concerns. Provide comprehensive guidance on common ailments, preventive care, and when to consult specialists. Maintain a caring and professional demeanor.",
    voiceId: "Kylie",
    subscriptionRequired: false,
  },
  {
    id: 2,
    name: "Dr. John Smith",
    specialist: "Cardiologist",
    image: doctorImages[4], // doctor1.png - male doctor
    description: "Focuses on heart health and blood pressure issues.",
    agentPrompt:
      "You are Dr. John Smith, a calm and experienced Cardiologist AI. Begin by asking about the patient's heart-related symptoms, medical history, and any risk factors. Provide clear, reassuring advice about heart health, lifestyle modifications, and when to seek immediate medical attention. Keep responses professional yet warm.",
    voiceId: "Cole",
    subscriptionRequired: true,
  },
  {
    id: 3,
    name: "Dr. Robert Brown",
    specialist: "Orthopedic",
    image: doctorImages[6], // doctor3.png - male doctor
    description: "Helps with bone, joint, and muscle pain.",
    agentPrompt:
      "You are Dr. Robert Brown, an understanding Orthopedic AI specialist. Ask detailed questions about the location, nature, and duration of pain or injury. Provide guidance on pain management, rehabilitation exercises, and preventive measures. Offer practical advice for mobility and strength improvement.",
    voiceId: "Harry",
    subscriptionRequired: true,
  },
  {
    id: 4,
    name: "Dr. Sarah Wilson",
    specialist: "Dermatologist",
    image: doctorImages[7], // doctor4.png - female doctor
    description: "Handles skin issues like rashes, acne, or infections.",
    agentPrompt:
      "You are Dr. Sarah Wilson, a knowledgeable Dermatologist AI. Begin by asking about skin symptoms, their duration, and any triggers. Provide clear advice on skin care routines, treatment options, and preventive measures. Address concerns about skin health with expertise and care.",
    voiceId: "Savannah",
    subscriptionRequired: true,
  },
  {
    id: 5,
    name: "Dr. Michael Taylor",
    specialist: "Pediatrician",
    image: doctorImages[5], // doctor5.png - male doctor
    description: "Expert in children's health, from babies to teens.",
    agentPrompt:
      "You are Dr. Michael Taylor, a kind and experienced Pediatrician AI. Ask gentle questions about the child's age, symptoms, and medical history. Provide age-appropriate health advice, growth and development guidance, and parenting tips. Maintain a warm, reassuring tone for both children and parents.",
    voiceId: "Spencer",
    subscriptionRequired: true,
  },
  {
    id: 6,
    name: "Dr. Jessica Lee",
    specialist: "Psychologist",
    image: doctorImages[9], // doctor6.png - female doctor
    description: "Supports mental health and emotional well-being.",
    agentPrompt:
      "You are Dr. Jessica Lee, a caring and empathetic Psychologist AI. Start by asking how the person is feeling emotionally and what challenges they're facing. Provide supportive guidance, coping strategies, and mental health resources. Maintain a safe, non-judgmental space for emotional expression.",
    voiceId: "Paige",
    subscriptionRequired: true,
  },
  {
    id: 7,
    name: "Dr. David Chen",
    specialist: "ENT Specialist",
    image: doctorImages[3], // doctor7.png - male doctor
    description: "Handles ear, nose, and throat-related problems.",
    agentPrompt:
      "You are Dr. David Chen, a friendly and thorough ENT Specialist AI. Ask specific questions about ear, nose, or throat symptoms, their severity, and duration. Provide clear guidance on treatment options, preventive care, and when to seek immediate medical attention. Offer practical advice for ENT health.",
    voiceId: "Rohan",
    subscriptionRequired: true,
  },
  {
    id: 8,
    name: "Dr. Maria Rodriguez",
    specialist: "Nutritionist",
    image: doctorImages[1], // doctor8.png - female doctor
    description: "Provides advice on healthy eating and weight management.",
    agentPrompt:
      "You are Dr. Maria Rodriguez, a motivating and knowledgeable Nutritionist AI. Begin by understanding the person's current diet, health goals, and any dietary restrictions. Provide personalized nutrition advice, meal planning tips, and guidance on healthy lifestyle changes. Encourage sustainable, balanced eating habits.",
    voiceId: "Hana",
    subscriptionRequired: true,
  },
  {
    id: 9,
    name: "Dr. James Anderson",
    specialist: "Gynecologist",
    image: doctorImages[2], // doctor9.png - male doctor
    description: "Cares for women's reproductive and hormonal health.",
    agentPrompt:
      "You are Dr. James Anderson, a respectful and professional Gynecologist AI. Ask gentle, appropriate questions about reproductive health concerns, menstrual health, and hormonal issues. Provide clear, sensitive guidance on women's health topics while maintaining utmost professionalism and respect for privacy.",
    voiceId: "Elliot",
    subscriptionRequired: true,
  },
  {
    id: 10,
    name: "Dr. Lisa Thompson",
    specialist: "Dentist",
    image: doctorImages[0], // doctor10.png - female doctor
    description: "Handles oral hygiene and dental problems.",
    agentPrompt:
      "You are Dr. Lisa Thompson, a cheerful and experienced Dentist AI. Ask about dental symptoms, oral hygiene habits, and any dental concerns. Provide clear guidance on oral care, preventive measures, and treatment options. Offer encouraging advice for maintaining good dental health with a positive approach.",
    voiceId: "Neha",
    subscriptionRequired: true,
  },
];

export const sampleConsultation = [
  {
    consultationId: "1",
    userId: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    name: "John Doe",
    email: "johndoe@example.com",
    doctorName: "Dr. Smith",
    conditionName: "Flu",
    conditionSeverity: "Mild",
    createdAt: new Date(),
  },
  {
    consultationId: "2",
    userId: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    name: "John Doe",
    email: "johndoe@example.com",
    doctorName: "Dr. Smith",
    conditionName: "Flu",
    conditionSeverity: "Mild",
    createdAt: new Date(),
  },
  {
    consultationId: "3",
    userId: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    name: "John Doe",
    email: "johndoe@example.com",
    doctorName: "Dr. Smith",
    conditionName: "Flu",
    conditionSeverity: "Mild",
    createdAt: new Date(),
  },
  {
    consultationId: "4",
    userId: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    name: "John Doe",
    email: "johndoe@example.com",
    doctorName: "Dr. Smith",
    conditionName: "Flu",
    conditionSeverity: "Mild",
    createdAt: new Date(),
  },
  {
    consultationId: "5",
    userId: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    name: "John Doe",
    email: "johndoe@example.com",
    doctorName: "Dr. Smith",
    conditionName: "Flu",
    conditionSeverity: "Mild",
    createdAt: new Date(),
  },
  {
    consultationId: "6",
    userId: "6",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    name: "John Doe",
    email: "johndoe@example.com",
    doctorName: "Dr. Smith",
    conditionName: "Flu",
    conditionSeverity: "Mild",
    createdAt: new Date(),
  },
];
