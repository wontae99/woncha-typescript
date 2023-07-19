import Modal from "../ui/modal";

interface VideoModalProps {
  videoKey: string;
  title: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = (props) => {
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
};

export default VideoModal;
