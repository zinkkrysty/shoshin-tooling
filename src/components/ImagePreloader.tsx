import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { allImages } from "../helpers/sprite";
import { TestJson } from "../types/Frame";

const ImagePreloader = ({
    json,
    onComplete,
}: {
    json: TestJson;
    onComplete: () => void;
}) => {
    const [loaded, setLoaded] = useState<number>(0);
    const images = useMemo(() => {
        return allImages(json);
    }, []);

    useEffect(() => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
            img.onload = () => setLoaded((prev) => prev + 1);
        });
    }, [images]);

    const allLoaded: boolean = loaded === images.length;

    return (
        <>
            {!allLoaded && (
                <>
                    <div>Loading images...</div>
                    <Box sx={{ width: "50%" }}>
                        <LinearProgress
                            variant="determinate"
                            value={(loaded / images.length) * 100}
                        />
                    </Box>
                </>
            )}
        </>
    );
};

export default ImagePreloader;
