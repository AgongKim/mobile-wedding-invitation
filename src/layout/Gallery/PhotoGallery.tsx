import { useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images from '@/layout/Gallery/Images.ts';

const PhotoGallery = () => {
  const [dimensions, setDimensions] = useState<Record<number, { width: number; height: number }>>({});

  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover', // 전체 이미지가 보이도록 맞추고 싶을 때는 contain / 비율 유지하고 싶을 때는 cover
    width: '100px',
    height: '150px',
  };

  return (
    <Gallery>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 0fr)',
          gridGap: 2,
        }}>
        {images.map((image, index) => {
          const dim = dimensions[index];
          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.source}
              width={dim?.width ?? image.width}
              height={dim?.height ?? image.height}>
              {({ ref, open }) => (
                <img
                  style={smallItemStyles}
                  alt={image.alt}
                  src={image.source}
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onClick={open}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    setDimensions((prev) => ({
                      ...prev,
                      [index]: { width: img.naturalWidth, height: img.naturalHeight },
                    }));
                  }}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;
