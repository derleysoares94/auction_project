import Navbar from "./navbar";

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <main className="p-4">{children}</main>
        </div>
    );
}