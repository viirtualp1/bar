export default function useSnackModal() {
  const isSnackModalOpen = ref(false)

  function openSnackModal() {
    isSnackModalOpen.value = true
  }

  function closeSnackModal() {
    isSnackModalOpen.value = false
  }

  return {
    isSnackModalOpen,
    openSnackModal,
    closeSnackModal,
  }
}
