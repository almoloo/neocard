// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract NeoCard {
    // Structure to store user profile data
    struct Profile {
        string username;
        string bio;
        string avatarHash; // IPFS hash for avatar image
        string[] socialLinks;
    }

    // Mapping from wallet address to user profile
    mapping(address => Profile) private profiles;

    // Event emitted when a profile is created or updated
    event ProfileUpserted(
        address indexed user,
        string username,
        string bio,
        string avatarHash,
        string[] socialLinks
    );

    // Function to either create or update a user profile (upsert pattern)
    function upsertProfile(
        string memory _username,
        string memory _bio,
        string memory _avatarHash,
        string[] memory _socialLinks
    ) external {
        // Check if the user already has a profile (i.e., username is not empty)
        if (bytes(profiles[msg.sender].username).length == 0) {
            // If profile doesn't exist, create it
            profiles[msg.sender] = Profile(
                _username,
                _bio,
                _avatarHash,
                _socialLinks
            );
        } else {
            // If profile exists, update it
            profiles[msg.sender].username = _username;
            profiles[msg.sender].bio = _bio;
            profiles[msg.sender].avatarHash = _avatarHash;
            profiles[msg.sender].socialLinks = _socialLinks;
        }

        // Emit a single event for both creation and update
        emit ProfileUpserted(
            msg.sender,
            _username,
            _bio,
            _avatarHash,
            _socialLinks
        );
    }

    // Function to fetch a user's profile data by their wallet address
    function getProfile(
        address _user
    )
        external
        view
        returns (
            string memory username,
            string memory bio,
            string memory avatarHash,
            string[] memory socialLinks,
            bool exists
        )
    {
        Profile memory profile = profiles[_user];

        // Check if the profile exists (i.e., the username is not empty)
        bool profileExists = bytes(profile.username).length != 0;

        return (
            profile.username,
            profile.bio,
            profile.avatarHash,
            profile.socialLinks,
            profileExists
        );
    }
}
