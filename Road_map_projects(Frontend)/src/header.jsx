function handleClickOutside(event) {
    if (personalRef.current && !personalRef.current.contains(event.target)) {
        setPersonalOpen(false);
    }
    if (generalRef.current && !generalRef.current.contains(event.target)) {
        setGeneralOpen(false);
    }
}