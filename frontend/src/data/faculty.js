export const faculty = [
  { id: 'keerthi-nv', name: 'Keerthi NV', subject: 'Physics', qualifications: 'B.E., M.Tech (VLSI)', initials: 'KN' },
  { id: 'dr-ramesh', name: 'Dr. Ramesh', subject: 'Physics', qualifications: 'B.Sc., M.Sc., Ph.D. (Atomic Physics)', initials: 'DR' },
  { id: 'dr-p-nageswara-rao', name: 'Dr. P. Nageswara Rao', subject: 'Mathematics', qualifications: 'M.Sc., M.Ed., KSET, Ph.D.', initials: 'PN' },
  { id: 'dr-karan', name: 'Dr. Karan', subject: 'Chemistry', qualifications: 'B.Sc., B.Ed., M.Sc., M.Ed., pursuing Ph.D.', initials: 'DK' },
  { id: 'dr-roopa', name: 'Dr. Roopa', subject: 'Biology', qualifications: 'B.Sc., B.Ed., M.Sc., M.Ed., pursuing Ph.D.', initials: 'DR' },
].map(person => ({ photo: null, bio: null, teachingFocus: null, ...person }))
