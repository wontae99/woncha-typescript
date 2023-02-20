import Modal from "../ui/modal";
import SearchBar from "./search-bar";

export default function SearchModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="">
        <SearchBar onClose={onClose} />
      </div>
    </Modal>
  );
}
