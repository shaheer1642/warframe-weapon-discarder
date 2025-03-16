import Items from "warframe-items";

interface Component {
    name: string;
    itemCount: number;
}

interface Weapon {
    name: string;
    components?: Component[];
    [key: string]: any; // for other weapon properties
}

interface WeaponWithDiscardInfo extends Weapon {
    isDiscardable: boolean;
    requiredForWeapons?: string[];
}

class ItemsService {
    getItems() {
        const allItems = new Items({ category: ['Primary', 'Secondary', 'Melee'] }) as Weapon[];

        // Create a map of weapons that are components of other weapons
        const weaponDependencyMap = new Map<string, string[]>();

        // First pass: build the dependency map
        allItems.forEach((weapon) => {
            if (weapon.components) {
                weapon.components.forEach((component) => {
                    // Check if the component is another weapon
                    if (allItems.some(w => w.name === component.name)) {
                        // Add or update the dependency list
                        const requiredFor = weaponDependencyMap.get(component.name) || [];
                        requiredFor.push(weapon.name);
                        weaponDependencyMap.set(component.name, requiredFor);
                    }
                });
            }
        });

        // Second pass: add discardable info to each weapon
        const weaponsWithDiscardInfo: WeaponWithDiscardInfo[] = allItems.map(weapon => ({
            ...weapon,
            isDiscardable: !weaponDependencyMap.has(weapon.name),
            requiredForWeapons: weaponDependencyMap.get(weapon.name)
        }));

        return weaponsWithDiscardInfo;
    }
}

const itemsService = new ItemsService();

export default itemsService;