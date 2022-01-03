const SpinnerCard = ({ row }) => (
  <div class="bg-white max-w-sm dark:bg-gray-800 dark:border-gray-700">
    <img class="rounded-t-lg p-2 m-auto" src={row.image} alt="image" />
    <div class="px-5 pb-4">
      <p class="text-gray-900 font-semibold text-sm tracking-tight dark:text-white">
        {row.name}
      </p>
      <div class="align-center mt-1">
        <button
          onClick={() => console.log(row.button)}
          class="m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
);

export default SpinnerCard;
