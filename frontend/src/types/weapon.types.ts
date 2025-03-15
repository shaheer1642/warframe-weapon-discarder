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
    accuracy: number;
    attacks: Attack[];
    buildPrice: number;
    buildQuantity: number;
    buildTime: number;
    category: string;
    components: Component[];
    consumeOnBuild: boolean;
    criticalChance: number;
    criticalMultiplier: number;
    damage: DamageDistribution;
    damagePerShot: number[];
    description: string;
    disposition: number;
    fireRate: number;
    imageName: string;
    introduced: {
        name: string;
        url: string;
        aliases: string[];
        parent: string;
        date: string;
    };
    isPrime: boolean;
    magazineSize: number;
    marketCost: number;
    masterable: boolean;
    masteryReq: number;
    multishot: number;
    name: string;
    noise: string;
    omegaAttenuation: number;
    patchlogs: PatchLog[];
    polarities: string[];
    procChance: number;
    productCategory: string;
    releaseDate: string;
    reloadTime: number;
    skipBuildTimePrice: number;
    slot: number;
    tags: string[];
    totalDamage: number;
    tradable: boolean;
    trigger: string;
    type: string;
    uniqueName: string;
    wikiaThumbnail: string;
    wikiaUrl: string;
} 