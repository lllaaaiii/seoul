import { Member, EventCategory, ScheduleEvent, Expense, TodoItem } from './types';

// Aesthetic Config
export const THEME_COLOR = '#89CFF0'; // Winter Blue
export const BG_COLOR = '#F7F4EB'; // Beige Paper
export const SOFT_SHADOW = '4px 4px 0px 0px #CBD5E1'; // Soft shadow style

export const EXCHANGE_RATE = 0.024; // 1 KRW = 0.024 TWD (Approx)

export const MEMBERS: Member[] = [
  { id: 'm1', name: 'Hana', color: 'bg-rose-200', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hana' },
  { id: 'm2', name: 'Min', color: 'bg-blue-200', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Min' },
  { id: 'm3', name: 'Yoon', color: 'bg-green-200', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yoon' },
  { id: 'm4', name: 'Soo', color: 'bg-yellow-200', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Soo' },
  { id: 'm5', name: 'Jin', color: 'bg-purple-200', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jin' },
];

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  [EventCategory.SIGHTSEEING]: 'bg-orange-100 text-orange-700 border-orange-200',
  [EventCategory.FOOD]: 'bg-rose-100 text-rose-700 border-rose-200',
  [EventCategory.TRANSPORT]: 'bg-slate-100 text-slate-700 border-slate-200',
  [EventCategory.STAY]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  [EventCategory.SHOPPING]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

// Cute Icons for Categories
export const CATEGORY_ICONS: Record<EventCategory, string> = {
  [EventCategory.SIGHTSEEING]: '🎡',
  [EventCategory.FOOD]: '🍰',
  [EventCategory.TRANSPORT]: '🚌',
  [EventCategory.STAY]: '🏠',
  [EventCategory.SHOPPING]: '🛍️',
};

// Mock Data for Demo
export const MOCK_EVENTS: ScheduleEvent[] = [];
export const MOCK_EXPENSES: Expense[] = [];
export const MOCK_TODOS: TodoItem[] = [];