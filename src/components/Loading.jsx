import { Spinner } from "@heroui/react";

export const Loading = () => {
    return (
        <div className="flex items-center justify-center py-20">
            <Spinner size="lg" color="primary" />
        </div>
    );
};