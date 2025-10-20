import {Brain, Code, Server, Smartphone} from "lucide-react";


export const  skillCategories = [
    {
        title: "Mobile Development",
        icon: Smartphone,
        color: "bg-red-500",
        skills: [
            { name: "Flutter", level: 95 },
            { name: "Dart", level: 90 },
            { name: "Android", level: 85 },
            // { name: "iOS", level: 20 },
            { name: "Kotlin", level: 75 },
        ],
    },
    {
        title: "State Management",
        icon: Code,
        color: "bg-red-500",
        skills: [
            { name: "Provider", level: 90 },
            { name: "Riverpod", level: 70 },
            { name: "GetX", level: 80 },
            { name: "BLoC", level: 60 },
            { name: "Cubit", level: 60 },
        ],
    },
    {
        title: "Backend & APIs",
        icon: Server,
        color: "bg-red-500",
        skills: [
            { name: "Node.js", level: 70 },
            { name: "Express", level: 70 },
            { name: "Django", level: 50 },
            { name: "REST APIs", level: 90 },
            // { name: "GraphQL", level: 75 },
        ],
    },
    // {
    //   title: "Firebase & Cloud",
    //   icon: Cloud,
    //   color: "bg-red-500",
    //   skills: [
    //     { name: "Firebase Auth", level: 90 },
    //     { name: "Cloud Messaging", level: 88 },
    //     { name: "Firestore", level: 85 },
    //     { name: "Cloud Functions", level: 80 },
    //     { name: "Firebase Storage", level: 82 },
    //   ],
    // },
    // {
    //   title: "Database",
    //   icon: Database,
    //   color: "bg-red-500",
    //   skills: [
    //     { name: "SQLite", level: 88 },
    //     { name: "Hive", level: 85 },
    //     { name: "MongoDB", level: 80 },
    //     { name: "PostgreSQL", level: 75 },
    //     { name: "Firebase DB", level: 90 },
    //   ],
    // },
    {
        title: "Programming Languages",
        icon: Brain,
        color: "bg-red-500",
        skills: [
            { name: "Dart", level: 95 },
            { name: "Python", level: 88 },
            { name: "JavaScript", level: 60 },
            { name: "Java", level: 80 },
            { name: "Kotlin", level: 85 },
        ],
    },
]
