
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTeamMembers } from '@actions/groups/teamsGroup';

interface GroupCardProps {
  displayName: string;
  description?: string;
  id: string;
  photoUrl?: string;
  memberCount?: number;
}

const GroupCard = ({
  displayName,
  description,
  id,
  photoUrl,
  memberCount,
}: GroupCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleExpand = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);

    if (!members.length && !loading) {
      setLoading(true);
      try {
        const teamMembers = await getTeamMembers(id);
        setMembers(teamMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={photoUrl} />
            <AvatarFallback>
              {displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-semibold">{displayName}</CardTitle>
        </div>
        <button
          onClick={toggleExpand}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-500">
          {description || 'No description available'}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="mr-1 h-4 w-4" />
          <span>{memberCount || 0} members</span>
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading members...</p>
            ) : (
              <div className="space-y-2">
                {members.map((member: any) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {member.displayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{member.displayName}</span>
                      {member.roles?.includes('owner') && (
                        <span className="text-xs text-gray-500">Owner</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupCard;