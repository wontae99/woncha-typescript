import Modal from "../ui/modal";

export default function VideoModal(props) {
  const { videoKey, title, onClose } = props;

  return (
    <Modal onClose={onClose}>
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="text-2xl text-end p-2 font-semibold">{title}</div>
    </Modal>
  );
}
