import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ponytail: localStorage-backed client stores for the student dashboard
// (owned courses, tasks, premium flag). Kept as-is from the original app;
// migrate to the API layer when the backend endpoints exist.

function safeParse(jsonString, fallback) {
	try {
		return jsonString ? JSON.parse(jsonString) : fallback;
	} catch {
		return fallback;
	}
}

function persisted(key, fallback) {
	const initial = browser ? safeParse(localStorage.getItem(key), fallback) : fallback;
	const store = writable(initial);
	if (browser) {
		store.subscribe((val) => localStorage.setItem(key, JSON.stringify(val)));
	}
	return store;
}

// 1. User profile
const defaultUser = {
	name: 'Rioolin',
	role: 'Regular Member',
	avatar: 'https://ui-avatars.com/api/?name=Rioolin&background=0D8ABC&color=fff',
	location: 'Jakarta, Indonesia',
	email: 'rioolin@example.com',
	phone: '081234567890'
};
export const user = persisted('khwarizmi_user', defaultUser);

// 2. Owned courses
export const ownedCourses = persisted('khwarizmi_courses', []);

// 3. Premium status
export const isPremium = persisted('khwarizmi_premium', false);

// 4. Assignments
const defaultTasks = [
	{
		id: 1,
		title: 'Redesign Homepage App',
		mapel: 'UI/UX Design',
		desc: 'Buat konsep baru yang lebih modern untuk halaman utama aplikasi.',
		priority: 'High',
		status: 'To Do',
		team: ['Rio'],
		due: 'Besok'
	},
	{
		id: 2,
		title: 'Slicing Landing Page',
		mapel: 'Frontend Dev',
		desc: 'Convert desain Figma ke HTML/CSS menggunakan Tailwind.',
		priority: 'Medium',
		status: 'In Progress',
		team: ['Rio'],
		due: '3 Hari Lagi'
	},
	{
		id: 3,
		title: 'Analisis Data User',
		mapel: 'Data Science',
		desc: 'Cek data user aktif bulan lalu.',
		priority: 'Low',
		status: 'Completed',
		team: ['Rio'],
		due: 'Selesai'
	}
];
export const tasks = persisted('khwarizmi_tasks', defaultTasks);
