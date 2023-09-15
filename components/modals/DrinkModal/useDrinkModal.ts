export default function useDrinkModal() {
  const isDrinkModalOpen = ref(false)

  function openDrinkModal() {
    isDrinkModalOpen.value = true
  }

  function closeDrinkModal() {
    isDrinkModalOpen.value = false
  }

  return {
    isDrinkModalOpen,
    openDrinkModal,
    closeDrinkModal,
  }
}
