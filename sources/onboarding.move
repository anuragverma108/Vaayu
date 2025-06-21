module onboarding::onboarding {
    use std::string::String;
    use std::signer;

    /// Error codes
    const E_PROFILE_ALREADY_EXISTS: u64 = 1;
    const E_PROFILE_NOT_FOUND: u64 = 2;

    /// User profile structure
    struct UserProfile has key, store {
        name: String,
        age: u8,
        gender: String,
        chronic_conditions: vector<String>,
        preferred_walk_time: String,
        pollution_sensitivity: String,
        location: String,
        created_at: u64,
    }

    /// Events
    struct ProfileCreatedEvent has drop, store {
        user_address: address,
        name: String,
        age: u8,
        location: String,
    }

    struct ProfileUpdatedEvent has drop, store {
        user_address: address,
        name: String,
        age: u8,
        location: String,
    }

    /// Create or update user profile
    public entry fun set_profile(
        account: &signer,
        name: String,
        age: u8,
        gender: String,
        chronic_conditions: vector<String>,
        preferred_walk_time: String,
        pollution_sensitivity: String,
        location: String,
    ) acquires UserProfile {
        let account_addr = signer::address_of(account);
        let timestamp = std::timestamp::now_seconds();
        
        // Check if profile already exists
        if (exists<UserProfile>(account_addr)) {
            // Update existing profile
            let profile = borrow_global_mut<UserProfile>(account_addr);
            profile.name = name;
            profile.age = age;
            profile.gender = gender;
            profile.chronic_conditions = chronic_conditions;
            profile.preferred_walk_time = preferred_walk_time;
            profile.pollution_sensitivity = pollution_sensitivity;
            profile.location = location;
            
            // Emit update event
            std::event::emit(ProfileUpdatedEvent {
                user_address: account_addr,
                name,
                age,
                location,
            });
        } else {
            // Create new profile
            let profile = UserProfile {
                name,
                age,
                gender,
                chronic_conditions,
                preferred_walk_time,
                pollution_sensitivity,
                location,
                created_at: timestamp,
            };
            move_to(account, profile);
            
            // Emit creation event
            std::event::emit(ProfileCreatedEvent {
                user_address: account_addr,
                name,
                age,
                location,
            });
        };
    }

    /// Get user profile
    public fun get_profile(account: address): UserProfile acquires UserProfile {
        assert!(exists<UserProfile>(account), E_PROFILE_NOT_FOUND);
        move_from<UserProfile>(account)
    }

    /// Check if user has a profile
    public fun has_profile(account: address): bool {
        exists<UserProfile>(account)
    }

    /// Delete user profile (only the account owner can delete their profile)
    public entry fun delete_profile(account: &signer) acquires UserProfile {
        let account_addr = signer::address_of(account);
        assert!(exists<UserProfile>(account_addr), E_PROFILE_NOT_FOUND);
        let UserProfile { 
            name: _, 
            age: _, 
            gender: _, 
            chronic_conditions: _, 
            preferred_walk_time: _, 
            pollution_sensitivity: _, 
            location: _, 
            created_at: _ 
        } = move_from<UserProfile>(account_addr);
    }

    /// Get profile name
    public fun get_name(profile: &UserProfile): &String {
        &profile.name
    }

    /// Get profile age
    public fun get_age(profile: &UserProfile): u8 {
        profile.age
    }

    /// Get profile location
    public fun get_location(profile: &UserProfile): &String {
        &profile.location
    }

    /// Get chronic conditions
    public fun get_chronic_conditions(profile: &UserProfile): &vector<String> {
        &profile.chronic_conditions
    }
} 