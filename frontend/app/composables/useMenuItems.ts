export const useMenuItems = () => {
    const nuxtLinksTeacher = [
        {
            id: 1,
            to: "/teacher/dashboard",
            name: "Dashboard",
            icons: "LayoutDashboard"
        },
        {
            id: 2,
            to: "/students/dashboard",
            name: "Students",
            icons: "Users"
        },
        {
            id: 3,
            to: "/students/attendance",
            name: "Attendance",
            icons: "CalendarCheck"
        }
    ]

    return {
        nuxtLinksTeacher
    }
}