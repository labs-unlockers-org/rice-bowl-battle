import { formatNumber } from './calculateRiceBowls';

const messages = [
  (winner: string, loser: string, diff: number) =>
    `${winner}님이 ${formatNumber(diff)} 그릇을 더 드셨네요! ${loser}님, 분발하셔야겠어요! 😄`,
  (winner: string, loser: string, diff: number) =>
    `${loser}님! ${winner}님보다 ${formatNumber(diff)} 그릇이나 적게 드셨어요. 더 드시고 오세요! 🍚`,
  (winner: string, loser: string, diff: number) =>
    `우와! ${winner}님이 ${loser}님보다 ${formatNumber(diff)} 그릇이나 더 드셨네요! 대단해요! 🎉`,
  (winner: string, loser: string, diff: number) =>
    `${loser}님, ${formatNumber(diff)} 그릇 차이가 나네요! ${winner}님을 따라잡으려면 열심히 드셔야겠어요! 💪`,
  (winner: string, loser: string, diff: number) =>
    `${winner}님이 ${formatNumber(diff)} 그릇 앞서고 계시네요! ${loser}님, 식사 더하러 가실까요? 😋`,
  (winner: string, loser: string, diff: number) =>
    `${winner}님의 대승리! ${loser}님과 무려 ${formatNumber(diff)} 그릇이나 차이가 나네요! 🏆`,
  (winner: string, loser: string, diff: number) =>
    `${loser}님, 아직 ${formatNumber(diff)} 그릇이나 남았어요! 맛있게 드시고 오세요~ 🍜`,
  (winner: string, loser: string, diff: number) =>
    `${winner}님이 ${formatNumber(diff)} 그릇 앞서가고 있어요! ${loser}님, 따라잡을 수 있죠? 💫`,
];

export function getRandomMessage(winner: string, loser: string, difference: number): string {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex](winner, loser, difference);
} 