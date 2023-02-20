import ContentProfileBody from "./content-profile-body";
import ProfileBackdrop from "./profile-backdrop";
import ProfileBody from "./profile-body";

export default function Profile({ data, type, contentId }) {
  return (
    <span className="profile-page">
      <ProfileBackdrop data={data} type={type} />
      {type === "user" ? (
        <ProfileBody data={data} />
      ) : (
        <ContentProfileBody data={data} type={type} contentId={contentId} />
      )}
    </span>
  );
}
