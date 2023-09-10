import Swal from "sweetalert2";

export const fireAlert = async function (title, icon) {
  await Swal.fire({
    title,
    icon,
    toast: true,
    position: "top-right",
    showCloseButton: false,
    showConfirmButton: false,
    timer: "2000",
    background: "#331D2C",
    color: "#fff",
  });
};

export const swalDelete = async function (title, agreeHandler = () => {}) {
  const canDelete = await Swal.fire({
    title,
    icon: "question",
    toast: true,
    position: "top-right",
    showCloseButton: true,
    showConfirmButton: true,
  });

  if (canDelete?.isConfirmed) {
    agreeHandler();
  }
};
