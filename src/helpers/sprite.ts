import { bodyStateNumberToName } from "../constants/constants";
import { CharacterName } from "../types/Character";
import { Direction } from "../types/Frame";

export function generateImagePath(
    characterName: CharacterName,
    bodyStateName: string,
    direction: Direction,
    frameNo: number
): string {
    return `./images/${characterName}/${bodyStateName}/${direction}/frame_${frameNo}.png`;
}

// Returns an array of all images used for animations
export function allImages(): string[] {
    return Object.values(CharacterName).flatMap((name) =>
        Object.values(bodyStateNumberToName[name]).flatMap((bodyState) =>
            [Direction.LEFT, Direction.RIGHT].flatMap((dir) =>
                // TODO: Get the actual number of frames for each animation
                [0, 1, 2].map((frameNo) =>
                    generateImagePath(name, bodyState, dir, frameNo)
                )
            )
        )
    );
}
