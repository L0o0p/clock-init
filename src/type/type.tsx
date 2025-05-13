export interface ColorPickerProps {
    selectedColor: SelectedColor;
    setSelectedColor: React.Dispatch<React.SetStateAction<SelectedColor>>
}

export interface SelectedColor {
    r: number;
    g: number;
    b: number;
    hex: string;
}

export interface Colors {
    A: string;
    B: string;
    C: string
}

export interface TimeMap {
    months: {
        [key: number]: string;  // 定义数字索引签名
    };
    weekdays: {
        [key: number]: string;  // 定义数字索引签名
    };
}