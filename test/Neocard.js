const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NeoCard Contract', function () {
	let NeoCard;
	let neocard;
	let owner;
	let addr1;
	let addr2;

	// Sample data for tests
	const sampleUsername = 'JohnDoe';
	const sampleBio = 'Blockchain Developer';
	const sampleAvatarHash = 'Qm1234567890';
	const sampleSocialLinks = [
		'https://twitter.com/johndoe',
		'https://github.com/johndoe',
	];

	const updatedUsername = 'JohnDoeUpdated';
	const updatedBio = 'Senior Blockchain Developer';
	const updatedAvatarHash = 'Qm0987654321';
	const updatedSocialLinks = ['https://linkedin.com/in/johndoe'];

	beforeEach(async function () {
		// Deploy the contract before each test
		NeoCard = await ethers.getContractFactory('NeoCard');
		[owner, addr1, addr2] = await ethers.getSigners();
		neocard = await NeoCard.deploy(); // Deploy the contract
	});

	it('Should allow a user to create a new profile', async function () {
		// Create a new profile for addr1
		await neocard
			.connect(addr1)
			.upsertProfile(
				sampleUsername,
				sampleBio,
				sampleAvatarHash,
				sampleSocialLinks
			);

		// Retrieve the profile for addr1
		const profile = await neocard.getProfile(addr1.address);

		// Assert that the profile details match what was inserted
		expect(profile[0]).to.equal(sampleUsername); // username
		expect(profile[1]).to.equal(sampleBio); // bio
		expect(profile[2]).to.equal(sampleAvatarHash); // avatarHash
		expect(profile[3]).to.deep.equal(sampleSocialLinks); // socialLinks
	});

	it('Should allow a user to update an existing profile', async function () {
		// First, create a profile for addr1
		await neocard
			.connect(addr1)
			.upsertProfile(
				sampleUsername,
				sampleBio,
				sampleAvatarHash,
				sampleSocialLinks
			);

		// Then, update the same profile
		await neocard
			.connect(addr1)
			.upsertProfile(
				updatedUsername,
				updatedBio,
				updatedAvatarHash,
				updatedSocialLinks
			);

		// Retrieve the updated profile for addr1
		const updatedProfile = await neocard.getProfile(addr1.address);

		// Assert that the profile has been updated with the new details
		expect(updatedProfile[0]).to.equal(updatedUsername); // updated username
		expect(updatedProfile[1]).to.equal(updatedBio); // updated bio
		expect(updatedProfile[2]).to.equal(updatedAvatarHash); // updated avatarHash
		expect(updatedProfile[3]).to.deep.equal(updatedSocialLinks); // updated socialLinks
	});

	it('Should return default values for a user with no profile', async function () {
		// Fetch the profile for addr2 (who has not created a profile yet)
		const profile = await neocard.getProfile(addr2.address);

		// Assert that the default values are returned
		expect(profile[0]).to.equal(''); // Empty username
		expect(profile[1]).to.equal(''); // Empty bio
		expect(profile[2]).to.equal(''); // Empty avatarHash
		expect(profile[3].length).to.equal(0); // Empty socialLinks array
	});

	it('Should emit an event when a profile is created', async function () {
		// Expect the ProfileUpserted event to be emitted on profile creation
		await expect(
			neocard
				.connect(addr1)
				.upsertProfile(
					sampleUsername,
					sampleBio,
					sampleAvatarHash,
					sampleSocialLinks
				)
		)
			.to.emit(neocard, 'ProfileUpserted')
			.withArgs(
				addr1.address,
				sampleUsername,
				sampleBio,
				sampleAvatarHash,
				sampleSocialLinks
			);
	});

	it('Should emit an event when a profile is updated', async function () {
		// First, create a profile for addr1
		await neocard
			.connect(addr1)
			.upsertProfile(
				sampleUsername,
				sampleBio,
				sampleAvatarHash,
				sampleSocialLinks
			);

		// Expect the ProfileUpserted event to be emitted on profile update
		await expect(
			neocard
				.connect(addr1)
				.upsertProfile(
					updatedUsername,
					updatedBio,
					updatedAvatarHash,
					updatedSocialLinks
				)
		)
			.to.emit(neocard, 'ProfileUpserted')
			.withArgs(
				addr1.address,
				updatedUsername,
				updatedBio,
				updatedAvatarHash,
				updatedSocialLinks
			);
	});
});
