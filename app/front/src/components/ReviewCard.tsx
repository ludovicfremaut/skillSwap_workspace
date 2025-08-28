export default function ReviewCard() {
  return (
    <div className="max-w bg-primary text-white">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Avis</h2>
        <h3 className="text-lg font-medium">Utilisateur: John Doe</h3>
        <p className="text-xs text-gray-500">Reviewed on: 2023-10-01</p>
        <p className="text-gray-700 m-4">
          "This is a sample review text. The user had a great experience!"
        </p>
      </div>
    </div>
  );
}
