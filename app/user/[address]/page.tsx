interface ProfilePageProps {
	params: {
		address: string;
	};
}

export default function UserPage({ params }: ProfilePageProps) {
	return <div>ProfilePage {params.address}</div>;
}
