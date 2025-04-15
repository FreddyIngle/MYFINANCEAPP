import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


//Register chart elements to render in component
ChartJS.register(ArcElement, Tooltip, Legend);

function SpendingChart() {

    const options = {};
    const data = {
        // categories of spending
        labels: ["Food", "Housing", "Car", "Utilities", "Other"],
        datasets: [
            {
            label: 'Monthly Spending',
            data: [500, 2200, 350, 200, 400],
            backgroundColor: [
                "#2563EB", // medium blue
                "#93C5FD", // light sky blue
                "#1E3A8A", // dark navy
                "#A5B4FC", // soft indigo
                "#CBD5E1", // slate gray (light, elegant)
            ],
            borderColor: "#fff",
            borderWidth: 2,
            }
        ]
    };
// ✅ This is the key — return JSX
return <Pie data={data} options={options} />;
}

export default SpendingChart;