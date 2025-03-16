export interface Attack {
    name: string;
    speed: number;
    crit_chance: number;
    crit_mult: number;
    status_chance: number;
    shot_type: 'Projectile' | 'AoE';
    shot_speed?: number;
    flight?: number;
    falloff?: {
        start: number;
        end: number;
        reduction: number;
    };
    damage: {
        [key: string]: number;
    };
}

export interface Component {
    uniqueName: string;
    name: string;
    description: string;
    itemCount: number;
    imageName: string;
    tradable: boolean;
    masterable: boolean;
    drops?: Array<{
        chance: number;
        location: string;
        rarity: string;
        type: string;
    }>;
    type?: string;
}

export interface DamageDistribution {
    total: number;
    impact: number;
    puncture: number;
    slash: number;
    heat: number;
    cold: number;
    electricity: number;
    toxin: number;
    blast: number;
    radiation: number;
    gas: number;
    magnetic: number;
    viral: number;
    corrosive: number;
    void: number;
    tau: number;
    cinematic: number;
    shieldDrain: number;
    healthDrain: number;
    energyDrain: number;
    true: number;
}

export interface PatchLog {
    name: string;
    date: string;
    url: string;
    additions: string;
    changes: string;
    fixes: string;
}

export interface WarframeWeapon {
    name: string;
    uniqueName: string;
    description: string;
    type?: string;
    category?: string;
    masteryReq?: number;
    damage?: {
        [key: string]: number;
        total: number;
    };
    fireRate?: number;
    criticalChance?: number;
    criticalMultiplier?: number;
    procChance?: number;
    noise?: string;
    accuracy?: number;
    magazineSize?: number;
    reloadTime?: number;
    disposition?: number;
    isPrime?: boolean;
    wikiaThumbnail?: string;
    isDiscardable: boolean;
    requiredForWeapons?: string[];
} 