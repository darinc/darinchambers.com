# TODO

Priority levels based on software development best practices:

- **P0 (Critical)**: Must complete before release - quality, stability, core functionality
- **P1 (High)**: Should complete soon - important for user experience and reliability
- **P2 (Medium)**: Nice to have - enhances experience but not blocking
- **P3 (Low)**: Future enhancements - can be deferred

---

## Settings System - Backlog

### P0 - Critical (Quality & Stability)

- [ ] Write integration tests for settings persistence
- [ ] Write integration tests for theme application
- [ ] Handle edge cases (rapid changes, invalid states, etc.)
- [ ] Verify test coverage meets 80%+ target

### P1 - High (User Experience & Reliability)

- [ ] Test settings UI on different browsers (Chrome, Firefox, Safari)
- [ ] Test responsive behavior on mobile/tablet devices
- [ ] Accessibility features (high contrast mode, screen reader support, reduced motion)

### P2 - Medium (Polish & Enhancement)

- [ ] Refine UI styling and transitions
- [ ] Add loading states/transitions for settings changes
- [ ] Create `src/content/settings-help.md` (detailed help documentation)
- [ ] Add settings-help.md to virtual filesystem
- [ ] Preview themes before applying

### P3 - Low (Future Features)

- [ ] Import/Export settings as JSON file
- [ ] Share settings via URL parameter
- [ ] Additional preset themes (dracula, solarized, monokai)
- [ ] Theme gallery with community-contributed themes
- [ ] Sound effects integration (keyboard typing sounds, completion sounds)
- [ ] Volume control for sound effects
- [ ] Advanced customization (line height, letter spacing, cursor style, blink rate)
