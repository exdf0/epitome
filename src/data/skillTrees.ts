export interface Skill {
  id: string
  name: string
  description: string
  abilityType: string
  baseIcon: string  // Base path without evolution suffix (e.g., '/game-images/warrior/.../sword_aura')
  maxPoints: number // 45 max with evolution system
}

export interface SkillPath {
  id: string
  name: string
  skills: Skill[]
}

export interface ClassSkillTree {
  classId: string
  className: string
  paths: SkillPath[]
}

export const skillTrees: Record<string, ClassSkillTree> = {
  WARRIOR: {
    classId: 'WARRIOR',
    className: 'Warrior',
    paths: [
      {
        id: 'path_of_body',
        name: 'Path of Body',
        skills: [
          {
            id: 'sword_aura',
            name: 'Sword Aura',
            description: 'The weapon is enveloped in an aura that boosts physical damage.',
            abilityType: 'Self-Enhancement',
            baseIcon: '/game-images/warrior/Abilities- Path of Body/sword_aura',
            maxPoints: 45,
          },
          {
            id: 'berserk',
            name: 'Berserk',
            description: 'The berserk aura increases movement and attack speed.',
            abilityType: 'Self-Enhancement',
            baseIcon: '/game-images/warrior/Abilities- Path of Body/berserk',
            maxPoints: 45,
          },
          {
            id: 'thrust',
            name: 'Thrust',
            description: 'A swift sword thrust dealing damage to enemies in a line.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Body/thrust',
            maxPoints: 45,
          },
          {
            id: 'harbinger',
            name: 'Harbinger',
            description: 'Two sword slashes create gusts that deal damage to enemies in a line.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Body/harbinger',
            maxPoints: 45,
          },
          {
            id: 'charge',
            name: 'Charge',
            description: 'A movement speed bonus with a shockwave that stuns enemies.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Body/charge',
            maxPoints: 45,
          },
          {
            id: 'sword_vortex',
            name: 'Sword Vortex',
            description: 'A spinning move with displacement that deals damage to enemies around.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Body/sword_vortex',
            maxPoints: 45,
          },
        ],
      },
      {
        id: 'path_of_soul',
        name: 'Path of Soul',
        skills: [
          {
            id: 'spiritual_body',
            name: 'Spiritual Body',
            description: 'Spiritual aura increases attack speed while reducing movement speed.',
            abilityType: 'Self-Enhancement',
            baseIcon: '/game-images/warrior/Abilities- Path of Soul/spiritual_body',
            maxPoints: 45,
          },
          {
            id: 'spiritual_strike',
            name: 'Spiritual Strike',
            description: 'A sword strike in a crescent shape dealing damage in a line.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Soul/spiritual_strike',
            maxPoints: 45,
          },
          {
            id: 'stomp',
            name: 'Stomp',
            description: 'A foot strike knocking down enemies around.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Soul/stomp',
            maxPoints: 45,
          },
          {
            id: 'mental_shock',
            name: 'Mental Shock',
            description: 'Weapon energy stuns and damages a single enemy.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Soul/mental_shock',
            maxPoints: 45,
          },
          {
            id: 'phantom_strike',
            name: 'Phantom Strike',
            description: 'A ground strike creates waves that deal damage to enemies.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Soul/phantom_strike',
            maxPoints: 45,
          },
          {
            id: 'roar',
            name: 'Roar',
            description: 'A shout deals damage and slows enemies around.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/warrior/Abilities- Path of Soul/roar',
            maxPoints: 45,
          },
        ],
      },
    ],
  },
  // Other classes will be added later
  NINJA: {
    classId: 'NINJA',
    className: 'Ninja',
    paths:  [
      {
        id: 'assasination',
        name: 'Assasination',
        skills: [
          {
            id: 'dance_of_blades',
            name: 'Dance of Blades',
            description: 'Perform four rapid slashes with blades or fire four explosive arrows (depending on the equipped weapon), each dealing <HL>{0}</> damage. Arrows additionally explode, dealing <HL>{1}</> area damage at medium range.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/ninja/Assassination/dance_of_blades',
            maxPoints: 45,
          },
          {
            id: 'ambush',
            name: 'Ambush',
            description: 'Perform four rapid slashes with blades or fire four explosive arrows (depending on the equipped weapon), each dealing <HL>{0}</> damage. Arrows additionally explode, dealing <HL>{1}</> area damage at medium range.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/ninja/Assassination/ambush',
            maxPoints: 45,
          },
          {
            id: 'shadow_trail',
            name: 'Shadow Trail',
            description: 'Become invisible for <HL>{duration}</> seconds, leaving a shadow trail behind you. Attacking or recasting the ability breaks invisibility.',
            abilityType: 'Self-Enhancement',
            baseIcon: '/game-images/ninja/Assassination/shadow_trail',
            maxPoints: 45,
          },
         {
            id: 'silent_leap',
            name: 'Silent Leap',
            description: 'You have 3 charges, allowing you to leap in the chosen direction at short range. If the leap ends in contact with an enemy, they are stunned for <HL>{0}</> seconds.',
            abilityType: 'Dash/Stun',
            baseIcon: '/game-images/ninja/Assassination/silent_leap',
            maxPoints: 45,
          },
          {
            id: 'shadow_shuriken',
            name: 'Shadow Shuriken',
            description: 'Throw a shuriken in the chosen direction at medium range. Upon hitting an enemy, teleport behind them, dealing <HL>{0}</> damage and automatically activating Ambush without triggering its cooldown.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/ninja/Assassination/shadow_shuriken',
            maxPoints: 45,
          },
          {
            id: 'dark_whirlwind',
            name: 'Dark Whirlwind',
            description: 'Whirl in place, creating a circle of blades or arrows around you and dealing <HL>{0}</> damage to all enemies at short range.',
            abilityType: 'Physical Attack',
            baseIcon: '/game-images/ninja/Assassination/dark_whirlwind',
            maxPoints: 45,
          },
          
          
        ],
      },
      {
        id: 'tang',
        name: 'Tang/Bow',
        skills: [
          {
            id: 'deadly_poisoning',
            name: 'Deadly Poisoning',
            description: 'Apply poison to your weapon for <HL>{duration}</> seconds. Basic attacks deal additional <HL>{0}</> damage with a <HL>{1}%</> chance to poison the enemy.',
            abilityType: 'Self-Enhancement',
            baseIcon: '/game-images/ninja/Tang/deadly_poisoning',
            maxPoints: 45,
          },
          {
            id: 'feint',
            name: 'Feint',
            description: 'Surround yourself with an aura for <HL>{duration}</> seconds. When hit by an enemy, instantly teleport behind them.',
            abilityType: 'Self-Enhancement',
            baseIcon: '/game-images/ninja/Tang/feint',
            maxPoints: 45,
          },
          {
            id: 'poison_blaze',
            name: 'Poison Blaze',
            description: 'Release a cloud of poison in the chosen direction at medium range, dealing <HL>{0}</> damage per second for <HL>{duration}</> seconds. Enemies remaining in the area for longer than 1 second become poisoned.',
            abilityType: 'Attack',
            baseIcon: '/game-images/ninja/Tang/poison_blaze',
            maxPoints: 45,
          },
          {
            id: 'sleeping_bomb',
            name: 'Sleeping Bomb',
            description: 'Throw a pouch of powder in the chosen direction at long range. Upon impact, it deals <HL>{0}</> damage and stuns the enemy for <HL>{1}</> seconds.',
            abilityType: 'Attack',
            baseIcon: '/game-images/ninja/Tang/sleeping_bomb',
            maxPoints: 45,
          },
          {
            id: 'rain_of_blades',
            name: 'Rain of Blades',
            description: 'Throw a shuriken upward, which shatters into smaller fragments that rain down around you at short range, dealing <HL>{0}</> area damage.',
            abilityType: 'Attack',
            baseIcon: '/game-images/ninja/Tang/rain_of_blades',
            maxPoints: 45,
          },
          {
            id: 'mirage',
            name: 'Mirage',
            description: 'Become invisible for <HL>{duration}</> seconds and create a clone that runs in the chosen direction at long range. The clone explodes upon contacting an enemy (knocking them down) or after reaching its maximum distance, dealing <HL>{0}</> area damage in a short radius and poisoning them.',
            abilityType: 'Self-Enhancement',
            baseIcon: '/game-images/ninja/Tang/mirage',
            maxPoints: 45,
          },
          
        ],
      },
    ],
  },
  SHAMAN: {
    classId: 'SHAMAN',
    className: 'Shaman',
    paths: [{
        id: 'dark',
        name: 'Dark',
        skills: [
          {
            id: 'curse',
            name: 'Curse',
            description: 'Apply a curse to a selected enemy, increasing the damage they take by <HL>{0}%</> for <HL>{duration}</> seconds',
            abilityType: 'Debuff',
            baseIcon: '/game-images/shaman/Dark/curse',
            maxPoints: 45,
          },
          {
            id: 'slow',
            name: 'Slow',
            description: 'Weaken a selected enemy, reducing their movement speed by <HL>{0}%</> and attack speed by <HL>{1}%</> for <HL>{duration}</> seconds.',
            abilityType: 'Debuff',
            baseIcon: '/game-images/shaman/Dark/slow',
            maxPoints: 45,
          },
          {
            id: 'eclipse',
            name: 'Eclipse',
            description: 'Envelop a selected enemy in shadow, reducing their damage output by <HL>{0}%</> for <HL>{duration}</> seconds.',
            abilityType: 'Debuff',
            baseIcon: '/game-images/shaman/Dark/eclipse',
            maxPoints: 45,
          },
          {
            id: 'howl_of_darkness',
            name: 'Howl of Darkness',
            description: 'Fire shadowy energy upward, dealing <HL>{0}</> damage to all enemies at short range.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/shaman/Dark/howl_of_darkness',
            maxPoints: 45,
          },
          {
            id: 'absorption',
            name: 'Absorption',
            description: 'Fire a shadowy orb in the chosen direction at long range. Upon hitting a target, it explodes, dealing <HL>{0}</> damage to all enemies around it in a short radius.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/shaman/Dark/absorption',
            maxPoints: 45,
          },
          {
            id: 'dark_conjuring',
            name: 'Dark Conjuring',
            description: 'Summon a darkness dragon that flies in a straight line in the chosen direction at long range, piercing through all enemies and dealing <HL>{0}</> damage to each target in its path.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/shaman/Dark/dark_conjuring',
            maxPoints: 45,
          },
          
        ],
      },
    {
        id: 'light',
        name: 'Light',
        skills: [
          {
            id: 'blessing',
            name: 'Blessing',
            description: 'Apply a blessing to a selected target (or yourself), increasing their resistance to basic attack damage by <HL>{0}%</> for <HL>{duration}</> seconds.',
            abilityType: 'Buff',
            baseIcon: '/game-images/shaman/Light/blessing',
            maxPoints: 45,
          },
          {
            id: 'precision',
            name: 'Precision',
            description: 'Empower a selected target (or yourself), increasing their critical strike chance by <HL>{0}%</> for <HL>{duration}</> seconds.',
            abilityType: 'Buff',
            baseIcon: '/game-images/shaman/Light/precision',
            maxPoints: 45,
          },
          {
            id: 'agility',
            name: 'Agility',
            description: 'Grant a selected target (or yourself) the blessing of agility, increasing their movement speed by <HL>{0}%</> and attack speed by <HL>{1}%</> for <HL>{duration}</> seconds.',
            abilityType: 'Buff',
            baseIcon: '/game-images/shaman/Light/agility',
            maxPoints: 45,
          },
          {
            id: 'luminous_howl',
            name: 'Luminous Howl',
            description: 'Fire radiant energy upward, dealing <HL>{0}</> damage to all enemies at short range.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/shaman/Light/luminous_howl',
            maxPoints: 45,
          },
          {
            id: 'flash',
            name: 'Flash',
            description: 'Fire a radiant orb in the chosen direction at long range. Upon hitting a target, it explodes, dealing <HL>{0}</> damage to all enemies around it in a short radius.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/shaman/Light/flash',
            maxPoints: 45,
          },
          {
            id: 'summon_light',
            name: 'Summon Light',
            description: 'Summon a light dragon that flies in a straight line in the chosen direction at long range, piercing through all enemies and dealing <HL>{0}</> damage to each target in its path.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/shaman/Light/summon_light',
            maxPoints: 45,
          },
          
        ],
      },
    ],
  },
  NECROMANCER: {
    classId: 'NECROMANCER',
    className: 'Necromancer',
    paths: [{
        id: 'blood',
        name: 'Blood',
        skills: [
          {
            id: 'dead_reckoning',
            name: 'Dead Reckoning',
            description: 'Summon a Dark Knight [PvP] that exclusively attacks players with single-target basic attacks, dealing <HL>{5}</> damage per hit, or a Great Ghoul [PvE] that exclusively attacks monsters with area attacks dealing <HL>{4}</> damage at short range and emits a decay aura pulling monsters from medium range. Summons last for <HL>{0}</> seconds.',
            abilityType: 'Summon',
            baseIcon: '/game-images/Necromancer/Blood/dead_reckoning',
            maxPoints: 45,
          },
          {
            id: 'undead_uprising',
            name: 'Undead Uprising',
            description: 'Summon <HL>{0}</> skeleton warriors that fight by your side for <HL>{1}</> seconds. Each skeleton deals <HL>{3}</> damage per hit.',
            abilityType: 'Summon',
            baseIcon: '/game-images/Necromancer/Blood/undead_uprising',
            maxPoints: 45,
          },
          {
            id: 'phantom_guardians',
            name: 'Phantom Guardians',
            description: 'Summon 3 phantoms that orbit you, attacking nearby enemies and dealing <HL>{0}</> damage per hit while applying Poisoned Blood. Poisoned Blood reduces healing received from all sources.',
            abilityType: 'Magical-Attack/Debuff',
            baseIcon: '/game-images/Necromancer/Blood/phantom_guardians',
            maxPoints: 45,
          },
          {
            id: 'blood_rage',
            name: 'Blood Rage',
            description: 'Enrage your minions for <HL>{duration}</> seconds, increasing their movement speed by <HL>{1}%</>, attack speed by <HL>{2}%</>, and granting 100% critical strike chance.',
            abilityType: 'Ghoul-Buff',
            baseIcon: '/game-images/Necromancer/Blood/blood_rage',
            maxPoints: 45,
          },
          {
            id: 'bloody_sickle',
            name: 'Bloody Sickle',
            description: 'Swing an energy scythe in a 180° arc in front of you, dealing <HL>{0}</> area damage to all enemies at short range.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/Necromancer/Blood/bloody_sickle',
            maxPoints: 45,
          },
          {
            id: 'vampiric_impulse',
            name: 'Vampiric Impulse',
            description: 'Unleash an explosion of dark energy, dealing <HL>{0}</> damage to all enemies at short range, healing yourself for <HL>{1}</>% per enemy hit, and gaining <HL>{2}</>% movement speed for <HL>{duration}</> seconds.',
            abilityType: 'Magic-Attack/Buff',
            baseIcon: '/game-images/Necromancer/Blood/vampiric_impulse',
            maxPoints: 45,
          },
          
        ],
      },
    {
        id: 'decay',
        name: 'Decay',
        skills: [
          {
            id: 'decomposition_zone',
            name: 'Decomposition Zone',
            description: 'Create a decomposition zone at medium range for <HL>{duration}</> seconds, reducing enemy movement speed inside by <HL>{0}%</> and reducing the damage you take from enemies inside the zone by <HL>{1}%',
            abilityType: 'Debuff/Buff',
            baseIcon: '/game-images/Necromancer/Decay/decomposition_zone',
            maxPoints: 45,
          },
          {
            id: 'tearing_shadow',
            name: 'Tearing Shadow',
            description: 'Fire accumulated energy as a lance at long range, piercing all enemies in front of you and dealing <HL>{0}</> damage to each enemy hit.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/Necromancer/Decay/tearing_shadow',
            maxPoints: 45,
          },
          {
            id: 'dark_reaper',
            name: 'Dark Reaper',
            description: 'Summon a reaper that repeatedly strikes with its scythe 5 times in the direction you are facing, dealing <HL>{0}</> area damage per strike at short range. The reaper attacks for <HL>{duration}</> seconds.',
            abilityType: 'Summon',
            baseIcon: '/game-images/Necromancer/Decay/dark_reaper',
            maxPoints: 45,
          },
          {
            id: 'avatar_of_blood',
            name: 'Avatar of Blood',
            description: 'Assume a blood form for <HL>{duration}</> seconds. Enemies hitting you are stunned for <HL>{0}</> seconds.',
            abilityType: 'Buff/Debuff',
            baseIcon: '/game-images/Necromancer/Decay/avatar_of_blood',
            maxPoints: 45,
          },
           {
            id: 'decay_infusion',
            name: 'Decay Infusion',
            description: 'Infuse your sword with decay energy for <HL>{duration}</> seconds, increasing basic attack damage by <HL>{2}</>%.',
            abilityType: 'Buff',
            baseIcon: '/game-images/Necromancer/Decay/decay_infusion',
            maxPoints: 45,
          },
          {
            id: 'blood_transfusion',
            name: 'Blood Transfusion',
            description: 'Link yourself to an enemy with blood bonds for <HL>{duration}</> seconds, dealing <HL>{0}</> damage per second and healing yourself for an amount equal to the damage dealt.',
            abilityType: 'Magic-Attack',
            baseIcon: '/game-images/Necromancer/Decay/blood_transfusion',
            maxPoints: 45,
          },
         
          
        ],
      }],
  },
}

export const getSkillTree = (classId: string): ClassSkillTree | null => {
  return skillTrees[classId] || null
}
