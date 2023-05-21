type HeaderProps = {
  username: string;
};

function Header({ username }: HeaderProps) {
  return (
    <header>
      <nav className="px-4 lg:px-6 py-2.5 dark:bg-inherit border-b border-neutral-700">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              🗺️ battleships
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <h1 className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              {username ?? 'guest'}
            </h1>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
