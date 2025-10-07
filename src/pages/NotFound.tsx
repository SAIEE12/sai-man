import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary arcade-glow">404</h1>
        <p className="text-2xl text-muted-foreground">GAME OVER - Page Not Found</p>
        <p className="text-lg text-foreground">
          Looks like Pac-Man ate this page!
        </p>
        <Link to="/">
          <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 arcade-glow">
            RETURN TO GAME
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
