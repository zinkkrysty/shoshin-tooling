import { bodyStateNumberToName } from "../constants/constants";
import { CharacterName } from "../types/Character";
import { Direction, TestJson } from "../types/Frame";

export function generateImagePath(
    characterName: CharacterName,
    bodyStateName: string,
    direction: Direction,
    frameNo: number
): string {
    return `./images/${characterName}/${bodyStateName}/${direction}/frame_${frameNo}.png`;
}

// Returns an array of all images used for animations
export function allImages(json: TestJson): string[] {
    return Object.values(CharacterName).flatMap((name) => {
        const agent =
            name === CharacterName.JESSICA ? json.agent_0 : json.agent_1;

        const images = agent.frames.flatMap((frame) => {
            const dir =
                frame.body_state.dir === 0 ? Direction.LEFT : Direction.RIGHT;
            return generateImagePath(
                name,
                bodyStateNumberToName[name][frame.body_state.state],
                dir,
                frame.body_state.counter
            );
        });

        return images.filter(
            (img, index, array) => array.indexOf(img) === index
        );
    });
}
