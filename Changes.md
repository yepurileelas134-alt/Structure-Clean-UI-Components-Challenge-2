# Changes.md — FocusForge Component Architecture Refactor

## What the Original DashboardPage.jsx Looked Like

The original file was a ~250-line "God Component" that mixed all concerns in one place:
- Raw HTML layout for the header, stats, input, filters, and task rows
- All state declarations (tasks, filter, search, new task input)
- All event handlers (add, toggle, delete) co-located with rendering logic
- No components — just anonymous JSX blocks inside `map()` calls

This made the file risky to edit (touching one section could break another), impossible to reuse individual UI pieces, and hard for new developers to navigate.

---

## Components Created

### `src/components/dashboard/DashboardHeader.jsx`
**Responsibility:** Renders the FocusForge logo, the page heading, the user greeting, and today's date.

**Placed in `dashboard/` because:** It contains the FocusForge brand name, the greeting copy ("Good morning, Developer!"), and the date display — all specific to this page. It has no use elsewhere.

**Props:** `userName` — the name to display in the greeting.

---

### `src/components/dashboard/StatsRow.jsx`
**Responsibility:** Renders the four summary metric cards in a horizontal row.

**Placed in `dashboard/` because:** It knows which metrics are relevant on this page (Total, Completed, High Priority, Remaining). It orchestrates `StatCard` with dashboard-specific meaning.

**Props:** `total`, `completed`, `highPriority`, `completionRate`

---

### `src/components/dashboard/AddTaskInput.jsx`
**Responsibility:** Renders the controlled text input, priority selector, and Add button for creating new tasks.

**Placed in `dashboard/` because:** Task creation is a dashboard-specific interaction. A shared input component wouldn't know about the "priority" concept.

**Props:** `value`, `priority`, `onChange`, `onPriorityChange`, `onSubmit`

---

### `src/components/dashboard/TaskFilterBar.jsx`
**Responsibility:** Renders the filter tabs (All / Active / Completed / High) and the search input.

**Placed in `dashboard/` because:** The filter categories (active, high priority, etc.) are specific to the task domain on this page.

**Props:** `activeFilter`, `searchQuery`, `taskCounts`, `onFilterChange`, `onSearchChange`

---

### `src/components/dashboard/TaskList.jsx`
**Responsibility:** Renders the task panel container with its header, filter bar, task rows (via `TaskItem`), empty state, and footer summary.

**Placed in `dashboard/` because:** It composes dashboard-specific components (`TaskFilterBar`) alongside the shared `TaskItem`. It knows the structure and empty-state messaging for this page.

**Props:** `tasks`, `totalCount`, `activeFilter`, `searchQuery`, `taskCounts`, `onFilterChange`, `onSearchChange`, `onToggle`, `onDelete`

---

### `src/components/shared/StatCard.jsx`
**Responsibility:** Renders a single metric card with a label, a large value, an icon, and an optional trend indicator.

**Placed in `shared/` because:** It has zero knowledge of the dashboard. It renders whatever label/value/icon it receives. It could appear on a reports page, a user profile, or an admin panel without any changes.

**Props:** `label`, `value`, `icon`, `color`, `trend`

---

### `src/components/shared/TaskItem.jsx`
**Responsibility:** Renders a single task row — the checkbox, task text, tag badge, priority badge, and delete button.

**Placed in `shared/` because:** A task row is a self-contained display piece. It could be reused on a mobile dashboard, a completed-tasks archive page, or a project view without modification. It receives all data and handlers via props and has no internal state.

**Props:** `task`, `onToggle`, `onDelete`

---

## What DashboardPage.jsx Contains Now

After the refactor, `DashboardPage.jsx` contains exactly four things:
1. **State declarations** (`tasks`, `newTaskText`, `newPriority`, `activeFilter`, `searchQuery`)
2. **Derived values** (`completedCount`, `highPriorityCount`, `completionRate`, `taskCounts`, `filteredTasks`)
3. **Event handlers** (`handleAddTask`, `handleToggle`, `handleDelete`)
4. **Component composition** — six component tags with props passed down

There is zero raw HTML in the page's return statement. The JSX reads like a table of contents.

---

## What I Would Do Differently at 10× Scale

- **Extract a `useTasks` custom hook** to separate task state and handlers from the page component entirely — the page would then just call `const { tasks, handleAdd, ... } = useTasks()`.
- **Add React Context or Zustand** for global state if tasks needed to be accessed on multiple pages.
- **Separate filter logic** into a `useTaskFilter` hook so filtering can be tested independently.
- **Add prop-types or TypeScript interfaces** to document each component's contract explicitly.
- **Write unit tests** for each shared component with mock data to verify rendering in isolation.

---

## Deployment URL

[Add your Vercel/Netlify deployment URL here]
