export default function Card({ label, count, color, icon }) {
    const colors = {
        orange: 'bg-orange-100 text-orange-600',
        green: 'bg-green-100 text-green-600',
        blue: 'bg-blue-100 text-blue-600',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200 flex-1 min-w-[160px]">
            <div className={`p-3 rounded-full ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">{count}</p>
            </div>
        </div>
    );
}
