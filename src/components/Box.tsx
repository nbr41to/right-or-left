import { PiCubeThin } from 'react-icons/pi';
import { Chip } from './Chip';
import { TbArrowBigDownLineFilled } from 'react-icons/tb';
import clsx from 'clsx';

type Props = {
  chips: Box;
  animate?: boolean;
  onClick: () => void;
};

export const Box = ({ chips, animate = false, onClick }: Props) => {
  const onChips = Object.entries(chips.on).map(([color, count]) => ({
    color,
    count,
  }));
  const inChips = Object.entries(chips.in).map(([color, count]) => ({
    color,
    count,
  }));

  return (
    <button className="relative" disabled={animate} onClick={onClick}>
      <div
        className={clsx(
          'flex items-center gap-px w-fit mx-auto z-30',
          animate
            ? 'relative pt-4'
            : 'absolute top-[70px] left-1/2 transform -translate-x-1/2'
        )}
      >
        {onChips.map(({ color, count }, i) => {
          if (!count) return null;
          return (
            <div key={i} className="relative -space-y-2">
              {Array.from({ length: count }).map((_, j) => (
                <div key={j} className="">
                  <Chip color={color as Color} size={16} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {animate ? (
        <div
          className="relative animate-bounce -mb-4 pt-8 z-20"
          style={{ animationDuration: '1.5s' }}
        >
          <PiCubeThin size={120} />

          <TbArrowBigDownLineFilled className="absolute bottom-2 left-5" />
          <TbArrowBigDownLineFilled className="absolute bottom-2 right-5" />
        </div>
      ) : (
        <PiCubeThin size={120} />
      )}

      {animate && (
        <div className="relative flex items-center gap-0.5 w-fit mx-auto z-10">
          {inChips.map(({ color, count }, i) => {
            if (!count) return null;
            return (
              <div key={i} className="relative -space-y-1.5">
                {Array.from({ length: count }).map((_, j) => (
                  <div key={j} className="">
                    <Chip color={color as Color} size={16} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
};
