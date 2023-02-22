export default function ProfileBodyCard(props) {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-0 md:px-4 w-full md:w-3/4 lg:w-3/5">
        <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-300 mb-6 shadow-xl rounded-lg -mt-64">
          {props.children}
        </div>
      </div>
    </section>
  );
}
