# Database map (Supabase project: Academix, region ap-south-1)

All tables are in the `public` schema, Row Level Security ON with NO policies.
The app reads and writes ONLY from server code with the secret key (`lib/supabaseAdmin.js`).

| Table | Columns used by the app |
|---|---|
| profiles | id (= auth user id), full_name, email, role (admin/incharge/student) |
| allowed_users | email (lowercase, PK), full_name, role, roll_number (required for students) |
| departments | id, department_code, department_name, is_active |
| courses | id, course_code, course_name, department_id, is_active |
| students | id, profile_id, roll_number, full_name, department_id, year_of_study, section, is_active |
| rooms | id, room_number, block_name, capacity, is_available |
| exams | id, exam_name, course_id, exam_date, session, department_id, year_of_study, section, is_published |
| exam_rooms | id, exam_id, room_id, incharge_id, submission_status (pending/submitted), submitted_at |
| exam_students | id, exam_id, student_id |
| allocations | id, exam_id, student_id, room_id, seat_no, attendance_status (unmarked/present/absent), marked_by, marked_at |

## Rules enforced by the database (the app must show their error messages)
- exams: unique (course_id, exam_date, session)
- allocations: unique (exam_id, student_id) and unique (exam_id, room_id, seat_no)
- allocations: trigger blocks over-capacity rooms, invalid seat numbers, students not in exam_students,
  rooms not assigned to the exam
- exam_rooms: trigger blocks the same room in two exams on the same date and session
- allocations: attendance_status unmarked => marked_at NULL; present/absent => marked_at required
- exam_rooms: pending => submitted_at NULL; submitted => submitted_at required
- NOT enforced by the database (app code must): block submission while any student is unmarked,
  lock attendance after submission, hide unpublished exams from students.

## Seed data already loaded (do NOT run the seed again)
6 auth users (admin@exam.test, incharge1@exam.test, incharge2@exam.test, student1..3@exam.test),
2 departments, 4 courses, 5 rooms (10, 8, 12, 15, 20 seats), 30 students, 3 exams, 5 exam_rooms,
42 exam_students, 27 allocations (21 present, 4 absent, 2 unmarked).
