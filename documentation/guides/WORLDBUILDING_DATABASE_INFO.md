# Worldbuilding Codex Database Information

## Database Connection Details

### Supabase Database
- **URL**: `https://vmgpefotjqcjtqrdprls.supabase.co`
- **Database Name**: Codex
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ3BlZm90anFjanRxcmRwcmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTE5Nzc0MywiZXhwIjoyMDY2NzczNzQzfQ.lNpJZ2Sl1AjwQ5RCZl_3Jd3c-pEuMUiXE5eJyAM4ewg`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ3BlZm90anFjanRxcmRwcmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExOTc3NDMsImV4cCI6MjA2Njc3Mzc0M30.st5N6SH1Z4mbbG6aiJIk91CjwjaFNG9odZa-z8GX4jA`

### External API Keys
- **OpenRouter API**: `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`
- **ElevenLabs API**: `sk_b8a5278f1fab8729685d761c2eed391e89a904bbbdccb8eb`
- **Hedra API**: `sk_hedra_VWCCkiHbupoW8Uhlp7O_nTGnDdmTAbHxzXG5-vxe3La8z0igEodof2k_oUGJKvKl`

## Database Schema

### Core Tables

#### 1. entity_types
Defines the types of content in the worldbuilding system:
```sql
CREATE TABLE entity_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

**Default Entity Types:**
- `character` (Characters)
- `location` (Locations) 
- `faction` (Factions)
- `event` (Events)
- `item` (Items)

#### 2. entity_fields
Dynamic field definitions for each entity type:
```sql
CREATE TABLE entity_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type_id uuid REFERENCES entity_types(id) ON DELETE CASCADE,
  field_name text NOT NULL,
  field_type text NOT NULL,
  is_required boolean DEFAULT false,
  is_immutable boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(entity_type_id, field_name)
);
```

#### 3. entities
Main content storage with flexible JSONB data:
```sql
CREATE TABLE entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type_id uuid REFERENCES entity_types(id) ON DELETE RESTRICT,
  name text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### 4. entity_relationships
Connections between any entities:
```sql
CREATE TABLE entity_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_entity_id uuid REFERENCES entities(id) ON DELETE CASCADE,
  to_entity_id uuid REFERENCES entities(id) ON DELETE CASCADE,
  relationship_type text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(from_entity_id, to_entity_id, relationship_type)
);
```

## Data Structure Logic

### Entity System
- **Flexible Schema**: Entity types can have custom fields added at runtime
- **Immutable Fields**: Core fields (status, type, etc.) cannot be deleted
- **Required Fields**: Certain fields must be present for entity creation
- **JSONB Storage**: All dynamic data stored in flexible JSONB format

### Core Entity Fields by Type

#### Character Fields (Immutable)
- `status` (text, required) - alive/deceased/unknown
- `type` (text, required) - npc/player/historical
- Custom fields: description, age, title

#### Location Fields (Immutable)
- `type` (text, required) - fortress/town/forest/etc
- `parent_location_id` (reference, optional) - hierarchical locations
- Custom fields: description, population

#### Faction Fields (Immutable)
- `status` (text, required) - active/disbanded/dormant
- `faction_type` (text, required) - political/military/magical/etc
- Custom fields: description, leader

#### Event Fields (Immutable)
- `date` (text, required) - when event occurred
- `status` (text, required) - completed/ongoing/planned
- Custom fields: description, location

#### Item Fields (Immutable)
- `type` (text, required) - weapon/artifact/consumable/etc
- `rarity` (text, required) - common/rare/legendary/etc
- Custom fields: description, properties

### Relationship System
- **Bidirectional**: Relationships can be queried from both directions
- **Flexible Types**: Custom relationship types (leads, mentors, son_of, etc.)
- **Metadata**: Additional context stored in JSONB format
- **Cross-Type**: Any entity can relate to any other entity

## Agent System Classes

### SchemaAgent
- `addField(entityType, fieldName, fieldType, isRequired)` - Add custom fields
- `removeField(entityType, fieldName)` - Remove non-immutable fields
- `listFields(entityType)` - Get all fields for entity type

### DataFetcherAgent
- `getCompleteEntry(entityName)` - Get entity with all relationships
- `getEntitiesByFilter(entityType, filters)` - Query entities by data fields
- `getRelatedEntities(entityName, relationshipType)` - Find connected entities

### ContentCreatorAgent
- `createEntity(entityType, name, data)` - Create new entities
- `createRelationship(fromEntity, toEntity, relationshipType, metadata)` - Link entities

### LoreCuratorAgent
- `generateSummary(topic, entities)` - Create markdown summaries
- `findConnectedEntities(entityName, maxDepth)` - Traverse relationship networks

## Sample Data Structure

The system includes comprehensive sample data featuring:
- **Characters**: Sorceress-Queen Navrena, Prince Aldric, General Thane Ironwood, Court Wizard Erasmus
- **Locations**: Starfall Citadel, Haven's Rest, The Whispering Woods
- **Factions**: Royal Loyalists, Liberation Army, Circle of Stars
- **Events**: The Great Rebellion, Battle of the Crystal Bridge, The Prince's Exile
- **Relationships**: Complex web of connections between all entities

## Connection Setup

### JavaScript/Node.js
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vmgpefotjqcjtqrdprls.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ3BlZm90anFjanRxcmRwcmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTE5Nzc0MywiZXhwIjoyMDY2NzczNzQzfQ.lNpJZ2Sl1AjwQ5RCZl_3Jd3c-pEuMUiXE5eJyAM4ewg'

const supabase = createClient(supabaseUrl, supabaseKey)
```

### Python
```python
from supabase import create_client

url = "https://vmgpefotjqcjtqrdprls.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ3BlZm90anFjanRxcmRwcmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTE5Nzc0MywiZXhwIjoyMDY2NzczNzQzfQ.lNpJZ2Sl1AjwQ5RCZl_3Jd3c-pEuMUiXE5eJyAM4ewg"

supabase = create_client(url, key)
```

## Key Features for External Applications
1. **Dynamic Schema**: Add custom fields without database migrations
2. **Relationship Mapping**: Complex entity interconnections
3. **Agent-Based Operations**: High-level operations through specialized classes
4. **Flexible Querying**: JSONB support for complex data filtering
5. **Real-time Capabilities**: Supabase real-time subscriptions available
6. **Full-Text Search**: PostgreSQL full-text search capabilities
7. **Row-Level Security**: Supabase RLS for access control (if configured)